import { Module } from '@nestjs/common';
import { SuggestionsService } from './suggestions.service';
import { SuggestionsController } from './suggestions.controller';

@Module({
  providers: [SuggestionsService],
  controllers: [SuggestionsController],
})
export class SuggestionsModule {}
