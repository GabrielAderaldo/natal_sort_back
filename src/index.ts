import express, { Express } from 'express';
import cors from 'cors';
import { DatabaseRepository } from './infra/database/databaseRepository';
import { MongoDBService } from './infra/database/mongodb/mongodbService';

import auth from './presenter/routes/authRoute';

const app:Express = express();
require('dotenv').config();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());


const urlConnection = process.env.URL_CONNECTION;
const PORT = process.env.PORT || 3000;

if(!urlConnection) console.log('Error to get URL_CONNECTION from your environment');

const databaseRepository:DatabaseRepository = new DatabaseRepository(new MongoDBService());

databaseRepository.connect(urlConnection!).then(()=>{
    console.log('Connected to database');
}).catch((err)=>{
    console.log(err)
});


app.use('/auth',auth)

app.listen(PORT,function(){
    console.log('Server is running on port 3000');
});