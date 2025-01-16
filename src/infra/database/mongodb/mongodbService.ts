import mongoose from "mongoose";
import { DatabaseUseCase } from "../databaseUseCase";
import { MongoDBSingleton } from "./mongodbSingleton";
import { User } from "../../../domain/entity/user";
import { userCreateMongoDto } from "./mongoSchema/userMongoDto";

export class MongoDBService implements DatabaseUseCase {


    findUserByEmail(email: string): Promise<User> {
        throw new Error("Method not implemented.");
    }

   async createUser(user: User): Promise<User> {
        try{
            const userCreate = await userCreateMongoDto(user);
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
        const client = await mongoose.connect(urlConnetion);
        MongoDBSingleton.shared().setClient(client);
        return true;
    }

    disconnect(): Promise<Boolean> {
        throw new Error("Method not implemented.");
    }

    async isConnected(): Promise<Boolean> {
        const client = MongoDBSingleton.shared().getClient();
        if(!client) throw new Error("Client not found");
        return client.connection.readyState === 1 ? true : false;
    }

}