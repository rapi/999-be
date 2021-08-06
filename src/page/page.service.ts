import { Injectable } from '@nestjs/common';
import axios from 'axios';
import parsePageFromHtml from './utils/parsePageFromHtml';
import { IPageItem } from './IPageItem';

@Injectable()
export class PageService {
  public async getPage(link: string): Promise<IPageItem[]> {
    const { data } = await axios.get(`https://999.md${link}?view_type=detail`);
    return parsePageFromHtml(data);
  }
}
