export interface TokenUseCase {
    createToken(value: string): string;
    verifyToken(token: string): string;
}