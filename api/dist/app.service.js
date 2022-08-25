"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
let AppService = class AppService {
    constructor() {
        this.human = 'X';
        this.ia = '0';
        this.winCombos = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
    }
    async checkWinner(cell) {
        for (let i = 0; i < this.winCombos.length; i++) {
            const [a, b, c] = this.winCombos[i];
            if (cell[a] && cell[a] === cell[b] && cell[a] === cell[c]) {
                return cell[a] === this.ia ? 1 : -1;
            }
        }
        return null;
    }
    async getBestMove(cell) {
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
    async minimax(cell, isMaximizing) {
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
};
AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map