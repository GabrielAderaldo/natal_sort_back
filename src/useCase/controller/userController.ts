import { User } from "../../domain/entity/user";
import { BcryptService } from "../../infra/cryptograph/bcrypt/bcryptService";
import { CryptoRepository } from "../../infra/cryptograph/cryptoRepository";
import { DatabaseRepository } from "../../infra/database/databaseRepository";
import { MongoDBService } from "../../infra/database/mongodb/mongodbService";
import { CustomError } from "../../utils/customError";
import { UserRepository } from "../repository/userRepository";

export class UserController {
    
    cryptoService: CryptoRepository = new CryptoRepository(new BcryptService());
    databaseRepository: DatabaseRepository = new DatabaseRepository(new MongoDBService());
    userRepository: UserRepository = new UserRepository();

    async createUser(name: string, email: string, password: string): Promise<User> {
        try{
            const temporaryUser = new User(0,name, email, password);
            
            if(!temporaryUser.isValidEmail()) throw new CustomError("INVALID_ERROR","Error because invalid email",400);
            if(!temporaryUser.isValidPassword()) throw new CustomError("INVALID_ERROR","Error because invalid password",400);

            const hasUser = await this.userRepository.findUserByEmail(email);
            if(hasUser != null) throw new CustomError("INVALID_ERROR","Error because user already exists",400);

            const hashPassword = this.cryptoService.hashValue(password);
            temporaryUser.password = hashPassword;
            
            const createdUser = await this.userRepository.createUser(temporaryUser);
            return createdUser;
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