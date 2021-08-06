import { Controller, Get, Query } from '@nestjs/common';
import { PageService } from '../page/page.service';

@Controller('item')
export class ItemController {
  constructor(private readonly pageService: PageService) {}
  @Get()
  public getItems(@Query('link') links) {
    return JSON.stringify(links);
  }
}
