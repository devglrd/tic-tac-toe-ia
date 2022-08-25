import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  private magicBoard = [2, 7, 6, 9, 5, 1, 4, 3, 8];

  constructor(private readonly appService: AppService) {}

  @Get()
  async live() {
    return { live: true };
  }

  @Post('play')
  async play(
    @Body()
    { cell }: { cell: any },
  ) {
    const choice = await this.appService.getBestMove(cell);
    return {
      status: 'continue',
      choice: choice,
    };
  }
}
