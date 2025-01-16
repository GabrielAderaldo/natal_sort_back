import { CryptoUseCase } from "./cryptoUseCase";

export class CryptoRepository implements CryptoUseCase {

    private encryptService:CryptoUseCase;

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
    async compareValue(value: string, hash: string): Promise<boolean> {
        try{
            return await this.encryptService.compareValue(value,hash);
        }catch(e){
            throw e;
        }
    }
    
  
}