import express, { Express } from 'express';
import cors from 'cors';
import { DatabaseRepository } from './infra/database/databaseRepository';
import { MongoDBService } from './infra/database/mongodb/mongodbService';

import auth from './presenter/routes/authRoute';
import { TokenRepository } from './infra/token/tokenService';
import { JWTToken } from './infra/token/jwtToken/jwtService';

const app:Express = express();
require('dotenv').config();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());


const urlConnection = process.env.URL_CONNECTION;
const PORT = process.env.PORT || 3000;

if(!urlConnection) console.log('Error to get URL_CONNECTION from your environment');

const databaseRepository:DatabaseRepository = new DatabaseRepository(new MongoDBService());
const tokenRepository:TokenRepository = new TokenRepository(new JWTToken());

databaseRepository.connect(urlConnection!).then(()=>{
    console.log('Connected to database');
}).catch((err)=>{
    console.log(err)
});


app.use('/auth',auth)
app.use((req,res,next)=>tokenRepository.verifyTokenMiddleware(req,res,next));
app.use('/test',(req,res)=>{ res.json({message: 'Hello World'}); })
app.listen(PORT,function(){
    console.log('Server is running on port 3000');
});