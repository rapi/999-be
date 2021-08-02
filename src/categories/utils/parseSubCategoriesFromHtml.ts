import { load } from 'cheerio';
import { ICategory } from '../ICategory';

export default (html): ICategory[] => {
  const $ = load(html);
  const result = [];

  $('.category__subCategories-collection>a:first-child').each(function () {
    result.push({
      link: $(this).attr('href'),
      name: $(this).text(),
    });
  });
  return result;
};
