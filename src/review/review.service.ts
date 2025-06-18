import { Injectable } from '@nestjs/common';
import * as fs from 'node:fs';
import axios from 'axios';

@Injectable()
export class ReviewService {
  public async getReview(id: string): Promise<{ rate: number; count: number }> {
    const query = fs.readFileSync('src/review/review.query.graphql', 'utf8');
    const data = await axios.post(
      'https://999.md/graphql',
      {
        operationName: 'ReviewsTopic',
        variables: {
          input: {
            topicId: id,
            projectTitle: 'PROJECT_TITLE_999',
          },
        },
        query,
      },
      {
        headers: {
          accept: '*/*',
          'accept-language': 'en-US,en;q=0.9,ru;q=0.8',
          baggage:
            'sentry-environment=production,sentry-release=47e9d96d311c42a5dbe6fd6fb08df1443ea321cf,sentry-public_key=8c0da8a1581f038752d958d2e9ae8210,sentry-trace_id=b65872c3953ef7a5a1340904095bf87a,sentry-sampled=false',
          'cache-control': 'no-cache',
          'content-type': 'application/json',
          lang: 'ro',
          pragma: 'no-cache',
          priority: 'u=1, i',
          'sec-ch-ua':
            '"Google Chrome";v="137", "Chromium";v="137", "Not/A)Brand";v="24"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'sentry-trace': 'b65872c3953ef7a5a1340904095bf87a-bee121261aaee96e-0',
          source: 'desktop',
          cookie:
            '_ym_uid=166948034438239982; tmr_lvid=6133fdd8a003694d060e2e5d23cbc098; tmr_lvidTS=1669480344081; search_exact_match=no; show_all_checked_childrens=no; _ymab_param=sZW_NYGUFf1dkckyp1hkZKVcn-GkjrTEKX9T46nyNhqjUjaq61RguwTYMCpWvwMB1c69K3CBm8h9jZprrdfWGMquZZE; multiaction-list-onboarding=1; homepage_cabinet_tab=ads; hide_duplicates=yes; monolytics-client-id=6581afdda4c7d85d7ea3f052; sort_expanded=yes; _ga_JC108D5N0B=GS1.2.1716212410.1.0.1716212410.0.0.0; sort_type=price_asc; _ga_XL9X6SDQ4C=GS1.2.1721053887.168.0.1721054004.60.0.0; _ga_4H7QS4GF2L=GS1.2.1721053879.231.1.1721054068.0.0.0; _ga=GA1.1.193578420.1669480343; _ga_HXXC1GD2J1=GS1.1.1723117501.78.0.1723117600.60.0.1023152297; uid=76e378ef-0adc-4e2c-b178-613885ba9098; age_popup_show=False; uuid=92a85ea3-ee3c-4967-9a98-d17abf868a3c; source=desktop; _gcl_au=1.1.2000137383.1743349738; sc=7246FAFF-F800-C7E3-CC8A-A9ACA9E0B9F7; _ym_d=1743349738; _hjSessionUser_1489155=eyJpZCI6IjM2YTUxNzI0LTU4YjMtNTk0MC05OWFiLTFjMjc1ZjkwMTdmMCIsImNyZWF0ZWQiOjE3NDMzNDk3Mzc5NzQsImV4aXN0aW5nIjp0cnVlfQ==; shw_awtrep=false; eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50SUQiOiJhNWQyMzZhMy0wOWQ3LTQ0YTgtODU0ZC1mNTVmMTA1Mzg0ODkiLCJleHAiOjE3NTQ5MDM2Mzd9.mZD5Gt468wgNX5-OOkHBD_SSXExDJqYiSFWlgIG4710=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50SUQiOiJhNWQyMzZhMy0wOWQ3LTQ0YTgtODU0ZC1mNTVmMTA1Mzg0ODkiLCJhdmF0YXIiOiIwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDAucG5nIiwibG9naW4iOiJyYXB0b3JkaWFzIiwiZXhwIjoxNzQzNTI5MDM0fQ.X1JkfBXSz3uPvQNPJ1AlCCd6e1SP_exIRBTMHLyfph8; _xsrf=2|08ac1fd5|c09a7485b7ee0dfd76825d0dda0bc95f|1748895910; foreign_cookie=1; foo=bar; _hjSessionUser_2647128=eyJpZCI6ImEwZWU4NDYwLWEzYzAtNTkzMS1hZmEwLWNmZThkZWE5NDUyYiIsImNyZWF0ZWQiOjE3NDg4OTU5MTA3MzAsImV4aXN0aW5nIjp0cnVlfQ==; simpalsid.lang=ro; NEXT_LOCALE=ro; view_type=map; store.test; store.test=; _hjSession_1489155=eyJpZCI6ImE1ZTI2OGI2LTQzMDktNDQ5MC04YjE0LWEzNjlmYjA4Y2IxOCIsImMiOjE3NTAyNDc3NzEzMDksInMiOjAsInIiOjAsInNiIjowLCJzciI6MCwic2UiOjAsImZzIjowLCJzcCI6MH0=; _fbp=fb.1.1750247771349.639591718916715976; monolytics-session-id=6852a95b7eb9a8c5a0ee6143; am-uid-f=5aee8d9c-285f-46b5-aa82-060200d0b7a6; _ym_isad=2; __gfp_64b=OxyHVmudwVT0dTqz2Kk4iHllWIYM6q1m8gky.UQiPqH.K7|1692822976|2|||8:2:32; _ym_visorc=b; domain_sid=p0Vmm2WYkhEqMyJQN9Vs8%3A1750247772014; am-uid=df5117fd40f34e06998cc45550cb9bc1; __gads=ID=9b289c3a0de346d4:T=1750247771:RT=1750248659:S=ALNI_MaQhzjXd9I3kp953m9hf6gt2HGjHg; __gpi=UID=0000114092ab9cae:T=1750247771:RT=1750248659:S=ALNI_MZvDnt84No0qG8Vl0NEjgajCKQ3pw; __eoi=ID=38a1b2030da678c9:T=1750247771:RT=1750248659:S=AA-AfjZwtEnO9dadk_tRZa0M7GhB; _ga_BZSTQNNL68=deleted; amp_e741c0=gQK5HsZRZ3-xNaaF6NUpyW...1iu1eb34e.1iu1f6ar0.0.0.0; tmr_detect=0%7C1750248669371; _ga_BZSTQNNL68=GS2.1.s1750247771$o408$g1$t1750250009$j59$l0$h152071669',
          Referer: 'https://999.md/ro/profile/kirilboris',
          'Referrer-Policy': 'unsafe-url',
        },
      },
    );
    return {
      rate: data.data.data.reviewsTopic.reviewsStats.mean as number,
      count: data.data.data.reviewsTopic.reviewsStats.count as number,
    };
  }
}
