import { TokenUseCase } from "./tokenUseCase";

export class TokenRepository implements TokenUseCase {
    
    private jwtTokenService: TokenUseCase;

    constructor(tokenRepository: TokenUseCase) {
        this.jwtTokenService = tokenRepository;
    }
    verifyToken(token: string): string {
        try {
            return this.jwtTokenService.verifyToken(token);
        } catch (e) {
            throw e;
        }
    }

    createToken(value: string): string {
        try {
            return this.jwtTokenService.createToken(value);
        } catch (e) {
            throw e;
        }
    }
}