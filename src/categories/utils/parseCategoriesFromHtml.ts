import { load } from 'cheerio';
import { ICategory } from '../ICategory';

export default (html: string): ICategory[] => {
  const $ = load(html);
  const result = [];

  $('.main-CatalogNavigation a').each(function () {
    result.push({
      link: $(this).attr('href'),
      name: $(this).text(),
    });
  });
  return result;
};
