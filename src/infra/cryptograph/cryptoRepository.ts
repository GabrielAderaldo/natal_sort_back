import { CryptoUseCase } from "./cryptoUseCase";

export class CryptoRepository implements CryptoUseCase {

    encryptService:CryptoUseCase;

    constructor(encryptService:CryptoUseCase){
        this.encryptService = encryptService;
    }

    hashValue(value: string): string {
        try{
            return this.encryptService.hashValue(value);
        }catch(e){
            throw e;
        }
    }
    compareValue(value: string, hash: string): boolean {
        try{
            return this.compareValue(value, hash);
        }catch(e){
            throw e;
        }
    }
    
  
}