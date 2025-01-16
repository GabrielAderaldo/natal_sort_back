import jwt from 'jsonwebtoken';
import { CustomError } from '../../../utils/customError';
import { TokenUseCase } from '../tokenUseCase';

export class JWTToken implements TokenUseCase {
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

            const jwtToken = jwt.sign({value},process.env.SECRET_KEY!,{expiresIn:'1h'});
            return jwtToken;

        }catch(e){
            throw e;
        }
    }

}