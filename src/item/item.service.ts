import { Injectable } from '@nestjs/common';
import axios from 'axios';
import parseItemFromHtml from './utils/parseItemFromHtml';

@Injectable()
export class ItemService {
  async getItem(link: string) {
    const { data } = await axios.get(`https://999.md${link}`);
    return parseItemFromHtml(data);
  }
}
