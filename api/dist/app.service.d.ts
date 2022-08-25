export declare class AppService {
    private magicBoard;
    private human;
    private ia;
    private scoreAi;
    private scoreHuman;
    private winCombos;
    checkWinner(cell: any[]): Promise<1 | -1>;
    getBestMove(cell: any[]): Promise<number>;
    minimax(cell: any[], isMaximizing: boolean): Promise<number>;
}
