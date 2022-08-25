import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    private magicBoard;
    constructor(appService: AppService);
    live(): Promise<{
        live: boolean;
    }>;
    play({ index, cell, humanScore, }: {
        index: number;
        cell: any;
        humanScore: number[];
    }): Promise<{
        status: string;
        choice: number;
    }>;
}
