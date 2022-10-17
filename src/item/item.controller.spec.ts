import { Test, TestingModule } from '@nestjs/testing';
import { ItemController } from './item.controller';

describe('ItemController', () => {
  let controller: ItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemController],
    }).compile();

    controller = module.get<ItemController>(ItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    const ads = {};
    for (let i = 1; i < 10; i++) {
      const data = await fetch('category?page=' + i);
      const elements = await data.json();
      for (const j in elements) {
        const dataPage = await fetch('/api/item?link=' + elements[j].link);
        const item = await dataPage.json();
        ads[item.link] = item;
        console.log('[' + (parseInt(j) + (i - 1) * 83) + '/' + 83 * 9 + ']');
      }
    }
    Object.values(ads)
      .sort((a, b) => b.userMarkCount - a.userMarkCount)
      .forEach((e) => console.log(e.link, e.userMark));
  });
});
