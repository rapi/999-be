import { Controller, Get, Query } from '@nestjs/common';
import { ReviewService } from './review.service';
import { decode } from 'js-base64';

@Controller('review')
export class ReviewController {
  constructor(private readonly pageService: ReviewService) {}
  @Get()
  public getReview(@Query('id') id) {
    return this.pageService.getReview(id);
  }
}
