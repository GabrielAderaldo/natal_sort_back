export interface CryptoUseCase {
    hashValue(value: string): string;
    compareValue(value: string, hash: string): Promise<boolean>;
}