import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private human = 'X';
  private ia = '0';
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

  async checkWinner(cell: any[]) {
    for (let i = 0; i < this.winCombos.length; i++) {
      const [a, b, c] = this.winCombos[i];
      if (cell[a] && cell[a] === cell[b] && cell[a] === cell[c]) {
        return cell[a] === this.ia ? 1 : -1;
      }
    }
    return null;
  }

  async getBestMove(cell: any[]) {
    let bestScore = -Infinity;
    let bestMove = -1;
    for (let i = 0; i < 9; i++) {
      if (cell[i] === null) {
        cell[i] = this.ia;
        const score = await this.minimax(cell, false);
        cell[i] = null;
        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }
    return bestMove;
  }

  async minimax(cell: any[], isMaximizing: boolean) {
    let bestScore = -Infinity;
    let score = await this.checkWinner(cell);
    if (score !== null) {
      return score;
    }
    for (let i = 0; i < 9; i++) {
      if (cell[i] === null) {
        cell[i] = isMaximizing ? this.ia : this.human;
        score = await this.minimax(cell, !isMaximizing);
        cell[i] = null;
        if (score > bestScore) {
          bestScore = score;
        }
      }
    }
    return bestScore;
  }
}
