import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesController } from './categories/categories.controller';
import { CategoriesService } from './categories/categories.service';
import { PageController } from './page/page.controller';
import { PageService } from './page/page.service';
import { ItemController } from './item/item.controller';
import { ItemService } from './item/item.service';
import { SuggestionsModule } from './suggestions/suggestions.module';

@Module({
  imports: [SuggestionsModule],
  controllers: [AppController, CategoriesController, PageController, ItemController],
  providers: [AppService, CategoriesService, PageService, ItemService],
})
export class AppModule {}
