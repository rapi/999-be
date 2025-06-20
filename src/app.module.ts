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
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { ReviewController } from './review/review.controller';
import { ReviewService } from './review/review.service';
import { SubscribeController } from './subscribe/subscribe.controller';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    SuggestionsModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
  ],
  controllers: [
    AppController,
    CategoriesController,
    PageController,
    ReviewController,
    ItemController,
    UserController,
    SubscribeController,
  ],
  providers: [
    AppService,
    CategoriesService,
    PageService,
    ReviewService,
    ItemService,
    UserService,
  ],
})
export class AppModule {}
