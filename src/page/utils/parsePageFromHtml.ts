import { load } from 'cheerio';

export default (html: string): string[] => {
  const $ = load(html);
  const result = [];

  $('.ads-list-photo-item-thumb a').each(function () {
    result.push($(this).attr('href'));
  });
  return result.filter((link) => link.indexOf('booster') === -1);
};
