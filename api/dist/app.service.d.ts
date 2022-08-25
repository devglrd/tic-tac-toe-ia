export declare class AppService {
    private magicBoard;
    private humanScore;
    private ia;
    private scoreAi;
    private scoreHuman;
    private winCombos;
    getBestMove(cell: any[]): Promise<number>;
    private minimax;
}
