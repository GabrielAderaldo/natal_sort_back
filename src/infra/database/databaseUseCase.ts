import { User } from "../../domain/entity/user";

export interface DatabaseUseCase {
    connect(urlConnetion:string): Promise<Boolean>;
    disconnect(): Promise<Boolean>;
    isConnected(): Promise<Boolean>;
    findUserByEmail(email: string): Promise<User>;
    createUser(user: User): Promise<User>;
    updateUser(user:User): Promise<User>;
    deleteUser(id: number): Promise<Boolean>;
    
}   