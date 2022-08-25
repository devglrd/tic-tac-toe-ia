export declare class AppService {
    private human;
    private ia;
    private winCombos;
    checkWinner(cell: any[]): Promise<1 | -1>;
    getBestMove(cell: any[]): Promise<number>;
    minimax(cell: any[], isMaximizing: boolean): Promise<number>;
}
