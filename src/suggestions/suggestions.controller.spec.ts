import { Test, TestingModule } from '@nestjs/testing';
import { SuggestionsController } from './suggestions.controller';

describe('SuggestionsController', () => {
  let controller: SuggestionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuggestionsController],
    }).compile();

    controller = module.get<SuggestionsController>(SuggestionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
