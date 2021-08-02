import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesController } from './categories/categories.controller';
import { CategoriesService } from './categories/categories.service';

@Module({
  imports: [],
  controllers: [AppController, CategoriesController],
  providers: [AppService, CategoriesService],
})
export class AppModule {}
