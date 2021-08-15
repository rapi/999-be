import { Controller, Get, Query } from '@nestjs/common';
import { PageService } from './page.service';

@Controller('page')
export class PageController {
  constructor(private readonly pageService: PageService) {}
  @Get()
  public getPage(@Query('link') link, @Query('linkBase64') linkBase64) {
    return this.pageService.getPage(
      linkBase64 ? Buffer.from(linkBase64, 'base64').toString() : link,
    );
  }
}
