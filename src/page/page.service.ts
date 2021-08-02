import { Injectable } from '@nestjs/common';
import axios from 'axios';
import parsePageFromHtml from './utils/parsePageFromHtml';
import parseItemFromHtml from './utils/parseItemFromHtml';
import { IItem } from './IItem';

@Injectable()
export class PageService {
  public async getPage(link: string): Promise<IItem[]> {
    const { data: pageLinks } = await axios.get(`https://999.md${link}`);
    const links = parsePageFromHtml(pageLinks);
    const result = await this.getItemsByLinks(links);
    return result;
  }
  public async getItemsByLinks(links: string[]): Promise<IItem[]> {
    const fetchItem = (link) =>
      axios
        .get(`https://999.md${link}`)
        .then(({ data }) => parseItemFromHtml(data));
    let responses = [];
    const CHUNK_SIZE = 20;
    for (let i = 0; i < links.length; i += CHUNK_SIZE) {
      responses = responses.concat(
        ...(await Promise.all(links.slice(i, i + CHUNK_SIZE).map(fetchItem))),
      );
    }
    return responses;
  }
}
