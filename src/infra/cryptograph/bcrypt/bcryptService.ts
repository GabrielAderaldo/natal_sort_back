import { CryptoUseCase } from "../cryptoUseCase";
import bcrypt from 'bcrypt';

export class BcryptService implements CryptoUseCase {
    async compareValue(value: string, hash: string): Promise<boolean> {
        try{
            return await bcrypt.compare(value, hash);
        }catch(e){
            throw e;
        }
    }

    hashValue(value: string): string {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(value,salt);
    }
   
}