import { User } from "../../../../domain/entity/user";
import { CustomError } from "../../../../utils/customError";
import { UserModel } from "./userSchema";

export const userCreateMongoDto = async (user:User) => {
    try{
        const userModel = await UserModel.create({
            name: user.name,
            email: user.email,
            password: user.password,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        });
    
        await userModel.save();
    
        const newCreateUser:User = new User(userModel.id, userModel.name, userModel.email, userModel.password);
        return newCreateUser;
    }catch(err){
        throw err;
    }
}

export const findUserByEmailMongoDto = async (email:string) => {
    try{
        const userModel = await UserModel.findOne({email: email}).exec();
        if(!userModel) return null;
        return userModel.toObject();
    }catch(err){
        throw err;
    }
}