import { Controller, Get, Query } from '@nestjs/common';
import { PageService } from './page.service';

@Controller('page')
export class PageController {
  constructor(private readonly pageService: PageService) {}
  @Get()
  public getPage(@Query('link') link) {
    return this.pageService.getPage(link);
  }
}
