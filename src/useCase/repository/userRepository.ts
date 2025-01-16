import { User } from "../../domain/entity/user";
import { BcryptService } from "../../infra/cryptograph/bcrypt/bcryptService";
import { CryptoRepository } from "../../infra/cryptograph/cryptoRepository";
import { CryptoUseCase } from "../../infra/cryptograph/cryptoUseCase";
import { DatabaseRepository } from "../../infra/database/databaseRepository";
import { DatabaseUseCase } from "../../infra/database/databaseUseCase";
import { MongoDBService } from "../../infra/database/mongodb/mongodbService";

export class UserRepository implements DatabaseUseCase {

    cryptoService: CryptoUseCase = new CryptoRepository(new BcryptService());
    databaseService: DatabaseUseCase = new DatabaseRepository(new MongoDBService());


    deleteUser(id: number): Promise<Boolean> {
        throw new Error("Method not implemented.");
    }
    connect(urlConnetion: string): Promise<Boolean> {
        //TODO: Dont use this method, because i need to fix one away to separate the connection from the repository and the useCase
        throw new Error("Method not implemented.");
    }
    disconnect(): Promise<Boolean> {
        //TODO: Dont use this method, because i need to fix one away to separate the connection from the repository and the useCase
        throw new Error("Method not implemented.");
    }
    isConnected(): Promise<Boolean> {
        //TODO: Dont use this method, because i need to fix one away to separate the connection from the repository and the useCase
        throw new Error("Method not implemented.");
    }
    findUserByEmail(email: string): Promise<User | null> {
        try{
            const user = this.databaseService.findUserByEmail(email);
            return user;
        }catch(e){
            throw e;
        }
    }
    updateUser(user: User): Promise<User> {
        throw new Error("Method not implemented.");
    }

    async createUser(user: User): Promise<User> {
        try{
            const createdUser = await this.databaseService.createUser(user);
            return createdUser;
        }catch(e){
            throw e;
        }   
    }
   
}