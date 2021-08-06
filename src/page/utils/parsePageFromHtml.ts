import { load } from 'cheerio';
import { IPageItem } from '../IPageItem';

export default (html: string): IPageItem[] => {
  const $ = load(html);
  const result = [];

  $('.ads-list-detail-item').each(function () {
    const price = $(this).find('.ads-list-detail-item-price').text();

    result.push({
      link: $(this).find('a').first().attr('href'),
      title: $(this).find('.ads-list-detail-item-title ').first().text().trim(),
      description: $(this).find('.ads-list-detail-item-intro').text().trim(),
      price: parseInt(price.replace(/[^0-9]/g, '')),
      noPrice: price.replace(/[0-9]/g, '').trim() === 'Договорная',
      currency: price.replace(/[0-9]/g, '').trim(),
      // .replace(/ /g, ''),
      img: [
        $(this)
          .find('img')
          .first()
          ?.attr('data-src')
          ?.replace('320x240', '900x900')
          .split('?')[0],
      ],
    });
  });
  return result.filter(({ link }) => link.indexOf('booster') === -1);
};
