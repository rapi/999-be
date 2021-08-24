import { Controller, Get, Query } from '@nestjs/common';
import { SuggestionsService } from './suggestions.service';
import axios from 'axios';

@Controller('suggestions')
export class SuggestionsController {
  constructor(private readonly suggestionService: SuggestionsService) {}
  @Get()
  public getSuggestions(@Query('search') query) {
    if (!query) return [];
    return axios
      .get('https://999.md/suggestions', { params: { query } })
      .then(({ data }) => data);
  }
}
