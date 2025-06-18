import { Controller, Get, Query } from '@nestjs/common';
import { PageService } from './page.service';

@Controller('page')
export class PageController {
  constructor(private readonly pageService: PageService) {}
  @Get()
  public getPage(@Query('categoryId') categoryId) {
    return this.pageService.getPage(categoryId);
  }
}
