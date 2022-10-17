import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  public getItems(@Query('link') link) {
    return this.userService.getUser(link);
  }
}
