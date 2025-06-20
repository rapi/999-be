import { Injectable } from '@nestjs/common';
import { IPageItem } from './IPageItem';
import axios from 'axios';
import * as fs from 'node:fs';
import * as path from 'path';

@Injectable()
export class PageService {
  public async getPage(categoryId: string): Promise<IPageItem[]> {
    const query = fs.readFileSync(
      path.join('graphql', 'page.graphql'), // <- relative to the .js file
      'utf8',
    );
    const data = await axios.post(
      'https://999.md/graphql',
      {
        operationName: 'SearchAds',
        variables: {
          isWorkCategory: false,
          includeCarsFeatures: false,
          includeBody: true,
          includeOwner: true,
          includeBoost: false,
          input: {
            subCategoryId: categoryId,
            source: 'AD_SOURCE_DESKTOP',
            pagination: { limit: 500, skip: 0 },
            filters: [],
          },
          locale: 'ru_RU',
        },
        query,
      },
      {
        headers: {
          accept: '*/*',
          'accept-language': 'en-GB,en;q=0.9',
          baggage:
            'sentry-environment=production,sentry-release=17e282d068951d6f8f6b7eb89cb100b20590d8f6,sentry-public_key=8c0da8a1581f038752d958d2e9ae8210,sentry-trace_id=8d9efb3f638549b6bf7b8143da33401d,sentry-sample_rate=0.05,sentry-sampled=false',
          'cache-control': 'no-cache',
          'content-type': 'application/json',
          lang: 'ru',
          pragma: 'no-cache',
          priority: 'u=1, i',
          'sec-ch-ua':
            '"Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'sentry-trace': '8d9efb3f638549b6bf7b8143da33401d-8c4c6342dc616e68-0',
          source: 'desktop',
          cookie:
            'uuid=60676ce9-b92f-4f42-99ca-0b1e0934a093; source=desktop; view_type=detail; store.test=; am-uid-f=5ee69dd3-479a-4b17-9282-3c1e3b56367b; _gcl_au=1.1.1168273101.1744634161; _fbp=fb.1.1744634161245.340680401134519581; am-uid=5ee69dd3479a4b1792823c1e3b56367b; _ga=GA1.1.1728801931.1744634161; tmr_lvid=4bb97d3688b3604afd86490b9348a726; tmr_lvidTS=1744634161371; monolytics-client-id=67fd0131b3088316bd50fdab; monolytics-session-id=67fd0131df85bc001dd985a3; __gfp_64b=YyuLUDayf_SJIrYVFgzNqqFxijCDRPXLclq83A0.w87.x7|1744634161|2|||8:2:32; _hjSession_1489155=eyJpZCI6ImFiNzMyNzI0LWNjNzQtNDczYy04NmQxLTIyMWYyOWFmZTJhMyIsImMiOjE3NDQ2MzQxNjE0MjgsInMiOjAsInIiOjAsInNiIjowLCJzciI6MCwic2UiOjAsImZzIjoxLCJzcCI6MX0=; sc=64ACF7B4-06FB-E286-C603-EC93C1CE6D9B; _ym_uid=1744634161550789603; _ym_d=1744634161; _ym_isad=2; _ym_visorc=b; _ymab_param=2bsdlM86FECzIhbB9-wpehH3WLtaCpUxelxPr7UajIQu-0PWbNQyD6PwhOm8t11wcTh6GNMRLm_9ft_RU8014iFsk8M; domain_sid=xhuUeyjZNaBniJ8svXEbV%3A1744634162886; _hjSessionUser_1489155=eyJpZCI6ImVkNDhlOWU1LWQzM2UtNTlkNy04MzE0LWM1OGE5OGRlYjRiOSIsImNyZWF0ZWQiOjE3NDQ2MzQxNjE0MjgsImV4aXN0aW5nIjp0cnVlfQ==; amp_e741c0=uwmXnoRAqPdd04VaB7FIor...1ioq4pa3a.1ioq54m0l.0.0.0; tmr_detect=0%7C1744634536332; _ga_BZSTQNNL68=GS1.1.1744634161.1.1.1744634536.52.0.1374417662',
          Referer:
            'https://999.md/ru/list/dating-and-greetings/i-need-a-man?page=1&view_type=detail',
          'Referrer-Policy': 'unsafe-url',
        },
      },
    );

    return data.data.data.searchAds.ads.map((add) => ({
      title: add.title,
      link: `https://999.md/ru/${add.id}`,
      userId: add.owner.id,
    }));
  }
}
