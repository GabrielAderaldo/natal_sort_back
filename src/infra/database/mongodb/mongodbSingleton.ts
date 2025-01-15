import { Mongoose } from "mongoose";

export class MongoDBSingleton{
    
    
    private static instance: MongoDBSingleton;
    mongoClient?: Mongoose;

    private constructor(){}

    static shared(): MongoDBSingleton{
        if(!MongoDBSingleton.instance){
            MongoDBSingleton.instance = new MongoDBSingleton();
        }
        return MongoDBSingleton.instance;
    }

    setClient(client: Mongoose){
        if(this.mongoClient != null || this.mongoClient != undefined){
            throw new Error("MongoDB client already set");
        }
        this.mongoClient = client;
    }

    getClient(): Mongoose{
        if(this.mongoClient == null || this.mongoClient == undefined){
            throw new Error("MongoDB client not set");
        }
        return this.mongoClient;
    }

    
}