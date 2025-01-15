import express, { Express } from 'express';
import cors from 'cors';
import { DatabaseRepository } from './infra/database/databaseRepository';
import { MongoDBService } from './infra/database/mongodb/mongodbService';

const app:Express = express();
require('dotenv').config();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());


const client = new DatabaseRepository(new MongoDBService());
const urlConnection = process.env.URL_CONNECTION;
if(!urlConnection) console.log('Error to get URL_CONNECTION from your environment');
client.connect(urlConnection!).then((result)=>{
    if(!result) console.log('Error to CONNECT to DATABASE');
    else console.log('Connected to DATABASE');
});

app.listen('3000',function(){
    console.log('Server is running on port 3000');
});