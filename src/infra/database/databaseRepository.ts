import { User } from "../../domain/entity/user";
import { DatabaseUseCase } from "./databaseUseCase";

export class DatabaseRepository implements DatabaseUseCase {
    
    databaseService: DatabaseUseCase;
    
    constructor(databaseService: DatabaseUseCase) {
        this.databaseService = databaseService;
    }

    findUserByEmail(email: string): Promise<User | null> {
        try{
            const user = this.databaseService.findUserByEmail(email);
            return user;
        }catch(e){
            throw e;
        }
    }

    async createUser(user: User): Promise<User> {
        try{
            const userCreate = await this.databaseService.createUser(user);
            return userCreate;
        }catch(e){
            throw e;
        }
    }

    updateUser(user: User): Promise<User> {
        throw new Error("Method not implemented.");
    }
    
    deleteUser(id: number): Promise<Boolean> {
        throw new Error("Method not implemented.");
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