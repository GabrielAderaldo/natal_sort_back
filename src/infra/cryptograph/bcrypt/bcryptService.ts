import { CryptoUseCase } from "../cryptoUseCase";
import bcrypt from 'bcrypt';

export class BcryptService implements CryptoUseCase {
    hashValue(value: string): string {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(value,salt);
    }
    compareValue(value: string, hash: string): boolean {
        return bcrypt.compareSync(value, hash);
    }
}