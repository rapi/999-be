import { Injectable } from '@nestjs/common';
import { ICategory } from './ICategory';
import axios from 'axios';
import parseCategoriesFromHtml from './utils/parseCategoriesFromHtml';
import parseSubCategoriesFromHtml from './utils/parseSubCategoriesFromHtml';

@Injectable()
export class CategoriesService {
  async getCategories(): Promise<ICategory[]> {
    const { data } = await axios.get('https://999.md/ru/');
    const categories = parseCategoriesFromHtml(data);
    const parseCategories = categories.map(({ link }) =>
      this.getSubcategory(link),
    );
    return categories.concat(...(await Promise.all(parseCategories)));
  }
  async getSubcategory(parentLink: string): Promise<ICategory[]> {
    const { data } = await axios.get(`https://999.md/${parentLink}`);
    return parseSubCategoriesFromHtml(data).map((e) =>
      Object.assign(e, { parentLink }),
    );
  }
}
