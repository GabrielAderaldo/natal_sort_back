import jwt from 'jsonwebtoken';
import { CustomError } from '../../../utils/customError';
import { TokenUseCase } from '../tokenUseCase';
import express from 'express';
import { ONE_MOUTH } from '../../../utils/constants';

export class JWTToken implements TokenUseCase {
    verifyTokenMiddleware(req: express.Request, res: express.Response, next: any) {
        try{
            const header = req.headers.authorization;

            if(!header) throw new CustomError("UNAUTHORIZED","Error because token not found",401);
            const parts = header.split(' ');
            if(parts.length !== 2) throw new CustomError("UNAUTHORIZED","Error because token invalid",401);
            const [scheme,token] = parts;
            if(!/^Bearer$/i.test(scheme)) throw new CustomError("UNAUTHORIZED","Error because token malformatted",401);

            const decoded = jwt.verify(token,process.env.SECRET_KEY!);
            if(!decoded) throw new CustomError("INVALID_ERROR","Error because invalid token",400);
            next();

        }catch(err){
            if(err instanceof CustomError){
                res.status(err.status).json(err.message);
            }else{
                console.log("Error: "+err+" Horario: "+new Date().toLocaleString());
                res.status(500).json({message: 'Internal server error, please contact the support'});
            }
        }
    }


    verifyToken(token: string): string {
        try{
            const SECRET_KEY = process.env.SECRET_KEY;
            if(!SECRET_KEY) throw new CustomError("INTERNAL_SERVER_ERROR","Error because secret key not found in enviroment",500);

            const decoded = jwt.verify(token,process.env.SECRET_KEY!);
            if(!decoded) throw new CustomError("INVALID_ERROR","Error because invalid token",400);
            
            return decoded.toString();
        }catch(e){
            throw e;
        }
    }

    
    createToken(value: string): string {
        try{
            const SECRET_KEY = process.env.SECRET_KEY;
            if(!SECRET_KEY) throw new CustomError("INTERNAL_SERVER_ERROR","Error because secret key not found in enviroment",500);

            const jwtToken = jwt.sign({value},process.env.SECRET_KEY!,{expiresIn:ONE_MOUTH});
            return jwtToken;

        }catch(e){
            throw e;
        }
    }

}