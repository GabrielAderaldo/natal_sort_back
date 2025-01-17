import { Request, Response } from "express";
import { TokenUseCase } from "./tokenUseCase";

export class TokenRepository implements TokenUseCase {
    
    private jwtTokenService: TokenUseCase;

    constructor(tokenRepository: TokenUseCase) {
        this.jwtTokenService = tokenRepository;
    }
    
    verifyTokenMiddleware(req: Request, res: Response, next: any) {
       try {
            this.jwtTokenService.verifyTokenMiddleware(req, res, next);
       }catch (e) {
           throw e;
       }
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