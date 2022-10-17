import { load } from 'cheerio';

export default (html: string) => {
  const $ = load(html);

  return {
    mark: parseFloat($('.rating').first().text()),
  };
};
