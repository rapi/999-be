import { Controller, Get, Query } from '@nestjs/common';
import { ItemService } from './item.service';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}
  @Get()
  public getItems(@Query('link') link) {
    return this.itemService.getItem(link);
  }
}
