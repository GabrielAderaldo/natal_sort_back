import { LoginEntity } from "../../domain/entity/login";
import { User } from "../../domain/entity/user";
import { BcryptService } from "../../infra/cryptograph/bcrypt/bcryptService";
import { CryptoRepository } from "../../infra/cryptograph/cryptoRepository";
import { DatabaseRepository } from "../../infra/database/databaseRepository";
import { MongoDBService } from "../../infra/database/mongodb/mongodbService";
import { JWTToken } from "../../infra/token/jwtToken/jwtService";
import { TokenRepository } from "../../infra/token/tokenService";
import { CustomError } from "../../utils/customError";
import { UserRepository } from "../repository/userRepository";

export class UserController {
    
    tokenRepository: TokenRepository = new TokenRepository(new JWTToken());
    cryptoRepository: CryptoRepository = new CryptoRepository(new BcryptService());
    databaseRepository: DatabaseRepository = new DatabaseRepository(new MongoDBService());
    userRepository: UserRepository = new UserRepository();

    async register(name: string, email: string, password: string): Promise<User> {
        try{
            const temporaryUser = new User(0,name, email, password);
            
            if(!temporaryUser.isValidEmail()) throw new CustomError("INVALID_ERROR","Error because invalid email",400);
            if(!temporaryUser.isValidPassword()) throw new CustomError("INVALID_ERROR","Error because invalid password",400);

            const hasUser = await this.userRepository.findUserByEmail(email);
            if(hasUser != null) throw new CustomError("INVALID_ERROR","Error because user already exists",400);

            const hashPassword = this.cryptoRepository.hashValue(password);
            temporaryUser.password = hashPassword;
            
            const createdUser = await this.userRepository.createUser(temporaryUser);
            return createdUser;
        }catch(e){
            throw e;
        }
    }

    async login(email: string, password: string): Promise<LoginEntity> {
        try{
            const user = await this.userRepository.findUserByEmail(email);
            if(user == null) throw new CustomError("INVALID_ERROR","Error because user or password is invalid",400);
            const isValidPassword = await this.cryptoRepository.compareValue(password, user.password);
            if(!isValidPassword) throw new CustomError("INVALID_ERROR","Error because user or password is invalid",400);
            const token = this.tokenRepository.createToken(user.email);
            const result: LoginEntity = {
                user: user,
                token: token
            }
            return result;
        }catch(e){
            throw e;
        }
    }

    async findUserByEmail(email: string): Promise<User | null> {
        try{
            const user = await this.userRepository.findUserByEmail(email);
            return user;
        }catch(e){
            throw e;
        }
    }
}