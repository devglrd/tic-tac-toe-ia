import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    private magicBoard;
    constructor(appService: AppService);
    live(): Promise<{
        live: boolean;
    }>;
    play({ cell }: {
        cell: any;
    }): Promise<{
        status: string;
        choice: number;
    }>;
}
