import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    live(): Promise<{
        live: boolean;
    }>;
    play(body: {
        humanScore: number[];
        iaScore: number[];
    }): Promise<number>;
}
