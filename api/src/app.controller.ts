import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('play')
  async play(@Body() body: { humanScore: number[]; iaScore: number[] }) {
    const posibility = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    const array = posibility
      .filter((e) => {
        return !body.humanScore.includes(e);
      })
      .filter((e) => {
        return !body.iaScore.includes(e);
      });
    return array[Math.floor(Math.random() * array.length)];
  }
}
