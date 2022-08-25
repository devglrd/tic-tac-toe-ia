import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private magicBoard = [2, 7, 6, 9, 5, 1, 4, 3, 8];
  private humanScore = 'X';
  private ia = '0';
  private scoreAi = [];
  private scoreHuman = [];
  private winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  async getBestMove(cell: any[]) {
    let bestScore = -Infinity;
    let bestMove = -1;
    for (let i = 0; i < 9; i++) {
      if (cell[i] === null) {
        cell[i] = this.ia;
        const score = this.minimax(cell, 0, false);
        cell[i] = null;
        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }
    return bestMove;
  }

  private minimax(cell: any[], number: number, b: boolean) {
    return 1;
  }
}
