import { DatabaseUseCase } from "./databaseUseCase";

export class DatabaseRepository implements DatabaseUseCase{
    
    databaseService: DatabaseUseCase;
    
    constructor(databaseService: DatabaseUseCase){
        this.databaseService = databaseService;
    }

    async connect(urlConnetion:string): Promise<Boolean> {
        await this.databaseService.connect(urlConnetion);
        return await this.databaseService.isConnected();
    }

    async disconnect(): Promise<Boolean> {
        throw new Error("Method not implemented.");
    }
    
    async isConnected(): Promise<Boolean> {
        return await this.databaseService.isConnected();
    }

}