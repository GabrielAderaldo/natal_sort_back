import  express,{ Express } from "express";

export interface TokenUseCase {
    createToken(value: string): string;
    verifyToken(token: string): string;
    verifyTokenMiddleware(req:express.Request,res:express.Response,next:any): any;
}