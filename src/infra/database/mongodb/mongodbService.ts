import mongoose from "mongoose";
import { DatabaseUseCase } from "../databaseUseCase";
import { MongoDBSingleton } from "./mongodbSingleton";

export class MongoDBService implements DatabaseUseCase{
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