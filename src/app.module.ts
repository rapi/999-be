import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesController } from './categories/categories.controller';
import { CategoriesService } from './categories/categories.service';
import { PageController } from './page/page.controller';
import { PageService } from './page/page.service';

@Module({
  imports: [],
  controllers: [AppController, CategoriesController, PageController],
  providers: [AppService, CategoriesService, PageService],
})
export class AppModule {}
