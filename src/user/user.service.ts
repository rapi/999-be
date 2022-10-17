import { Injectable } from '@nestjs/common';
import axios from 'axios';
import parseUserFromHtml from "./utils/parseUserFromHtml";

@Injectable()
export class UserService {
  async getUser(link: string) {
    const { data } = await axios.get(`https://999.md${link}`);
    return parseUserFromHtml(data);
  }
}
