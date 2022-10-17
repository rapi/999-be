import { load } from 'cheerio';
import { IItem } from '../IItem';
export default (html: string): IItem => {
  const $ = load(html);
  const views = $('.adPage__aside__stats .adPage__aside__stats__views')
    .text()
    .replace('Просмотры:', '')
    .replace(')', '')
    .split(' (сегодня ');

  const img = [];
  const mainFeatures = [];
  const secondaryFeatures = [];
  const location = [];
  $('#js-ad-photos .slick-cont-full-item-block img').each(function () {
    img.push($(this).attr('src').replace('320x240', '900x900'));
  });

  $('.adPage__content__features__col:first-child li').each(function () {
    const value = $(this).find('[itemprop="value"]').text().trim();
    mainFeatures.push({
      name: $(this).find('[itemprop="name"]').text().trim(),
      ...(value ? { value } : {}),
    });
  });

  $('.adPage__content__features__col:nth-child(2) li').each(function () {
    const value = $(this).find('[itemprop="value"]').text().trim();
    secondaryFeatures.push({
      name: $(this).find('[itemprop="name"]').text().trim(),
      ...(value ? { value } : {}),
    });
  });
  $('.adPage__content__region meta').each(function () {
    location.push({
      type: $(this).attr('itemprop'),
      name: $(this).attr('content'),
    });
  });
  const price = $('.adPage__content__price-feature__prices__price__value').attr(
    'content',
  );
  return {
    link: $('link[hreflang="ru"]').attr('href'),
    userMarkCount: parseFloat($('[itemprop="ratingCount"]').attr('content')),
    userMark: parseFloat($('[itemprop="ratingValue"]').text()),
    user: $('.adPage__aside__stats__owner a').attr('href'),
    title: $('.adPage__header').text().trim(),
    description: $('.adPage__content__description').text().trim(),
    views: parseInt(views[0]),
    viewsToday: parseInt(views[1]),
    img,
    price: parseInt(price),
    noPrice: !price,
    mainFeatures,
    secondaryFeatures,
    location,
  };
};
