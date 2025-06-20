import { Controller, OnModuleInit, Logger } from '@nestjs/common';
import { Telegraf, Context } from 'telegraf';
import * as fs from 'node:fs';
import * as path from 'path';
import { Cron } from '@nestjs/schedule';
import axios from 'axios';
import { PageService } from '../page/page.service';
const cacheDir = path.join(process.cwd(), 'cache');
const subsFile = path.join(cacheDir, 'subscriptions.json');
const getSubcategory = async (link: string): Promise<string> => {
  const { data } = await axios.get(link);
  const categoryId = data
    .split(`\\"subcategory\\":{\\"id\\":`)[1]
    .split(',')[0] as string;
  return categoryId;
};
@Controller()
export class SubscribeController implements OnModuleInit {
  private readonly logger = new Logger(SubscribeController.name);
  private bot: Telegraf<Context>;
  constructor(private readonly pageService: PageService) {
    // init bot
    this.bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN!);

    // make sure cache directory exists
    if (!fs.existsSync(cacheDir)) {
      fs.mkdirSync(cacheDir, { recursive: true });
    }

    // ensure subscriptions.json exists
    if (!fs.existsSync(subsFile)) {
      fs.writeFileSync(subsFile, '{}', { encoding: 'utf-8' });
    }
    const subscriptions = JSON.parse(fs.readFileSync(subsFile, 'utf-8'));
    const subscriptionKeys = Object.keys(subscriptions);
    for (const subscriptionKey of subscriptionKeys) {
      if (!fs.existsSync(cacheDir + '/' + subscriptionKey + '.json')) {
        fs.writeFileSync(
          cacheDir + '/' + subscriptionKey + '.json',
          '[]',
          'utf-8',
        );
      }
    }
  }

  onModuleInit() {
    this.bot.command('subscribe', async (ctx) => {
      const parts = ctx.message.text.trim().split(/\s+/);
      if (parts.length < 2) {
        return ctx.reply('❗ Usage: /subscribe <link>');
      }

      const rawLink = parts[1];
      let decoded: string;
      try {
        decoded = decodeURIComponent(rawLink);
      } catch {
        return ctx.reply(
          '⚠️ Failed to decode link. Make sure it’s URL-encoded.',
        );
      }

      const chatId = ctx.chat.id;
      // …your subscription logic here (e.g. save link + chatId to DB)…
      const subscriptions = JSON.parse(fs.readFileSync(subsFile, 'utf-8'));
      const subcategory = await getSubcategory(decoded);
      if (!subcategory) {
        return ctx.reply('❗ Invalid link or subcategory not found.');
      }
      fs.writeFileSync(
        subsFile,
        JSON.stringify({
          ...subscriptions,
          [chatId]: { link: decoded, filter: { subCategoryId: subcategory } },
        }),
        'utf8',
      );
      const adds = await this.pageService.getPage(subcategory);
      const addsMap = Object.fromEntries(adds.map((item) => [item.link, item]));
      fs.writeFileSync(
        cacheDir + '/' + chatId + '.json',
        JSON.stringify(addsMap),
        'utf-8',
      );
      this.logger.log(`Chat ${chatId} subscribed to: ${decoded}`);
      return ctx.reply(
        `✅ Subscribed chat ${chatId} to:\n${decoded}, on the page ${adds.length} adds found.`,
      );
    });

    this.bot.on('text', (ctx) => {
      if (ctx.message.text.startsWith('/')) {
        return ctx.reply('Unknown command. Try /subscribe <link>.');
      }
    });

    this.bot
      .launch()
      .then(() => this.logger.log('Telegram bot launched'))
      .catch((err) => this.logger.error('Failed to launch bot', err));
    this.handleCronEveryMinute();
  }
  @Cron('*/1 * * * *')
  async handleCronEveryMinute() {
    this.logger.debug('🔄 Running scheduled task: handleCronEveryMinute');
    const subscription = JSON.parse(
      fs.readFileSync(subsFile, { encoding: 'utf-8' }),
    );
    for (const chatId in subscription) {
      const oldAds = JSON.parse(
        fs.readFileSync(cacheDir + '/' + chatId + '.json', 'utf-8'),
      );
      const oldAddsLinks = Object.keys(oldAds);
      const sub = subscription[chatId];
      const { link, filter } = sub;
      this.logger.debug(`Checking subscription for chat ${chatId}: ${link}`);
      const adds = await this.pageService.getPage(filter.subCategoryId);
      const addsMap = Object.fromEntries(adds.map((item) => [item.link, item]));

      const newAds = adds.filter((item) => !oldAddsLinks.includes(item.link));
      fs.writeFileSync(
        cacheDir + '/' + chatId + '.json',
        JSON.stringify({ ...addsMap, ...oldAds }),
        'utf-8',
      );
      if (newAds.length > 0) {
        for (const sub of newAds) {
          this.bot.telegram.sendMessage(chatId, sub.link);
        }
      }
    }
  }
}
