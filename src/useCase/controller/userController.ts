import { User } from "../../domain/entity/user";
import { BcryptService } from "../../infra/cryptograph/bcrypt/bcryptService";
import { CryptoRepository } from "../../infra/cryptograph/cryptoRepository";
import { DatabaseRepository } from "../../infra/database/databaseRepository";
import { MongoDBService } from "../../infra/database/mongodb/mongodbService";
import { UserRepository } from "../repository/userRepository";

export class UserController {
    
    cryptoService: CryptoRepository = new CryptoRepository(new BcryptService());
    databaseRepository: DatabaseRepository = new DatabaseRepository(new MongoDBService());
    userRepository: UserRepository = new UserRepository();

    async createUser(name: string, email: string, password: string): Promise<User> {
        try{
            const temporaryUser = new User(0,name, email, password);
            
            if(!temporaryUser.isValidEmail()) throw {};
            if(!temporaryUser.isValidPassword()) throw {};

            const hashPassword = this.cryptoService.hashValue(password);
            temporaryUser.password = hashPassword;
            
            const createdUser = await this.userRepository.createUser(temporaryUser);
            return createdUser;
        }catch(e){
            throw e;
        }
    }
}