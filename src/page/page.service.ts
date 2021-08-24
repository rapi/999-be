import { Injectable } from '@nestjs/common';
import axios from 'axios';
import parsePageFromHtml from './utils/parsePageFromHtml';
import { IPageItem } from './IPageItem';

@Injectable()
export class PageService {
  public async getPage(link: string): Promise<IPageItem[]> {
    const path = link.includes('?')
      ? `${link}&view_type=detail`
      : `${link}?view_type=detail`;
    const { data } = await axios.get(encodeURI(`https://999.md${path}`));
    return parsePageFromHtml(data);
  }
}
