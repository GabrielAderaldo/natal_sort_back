import mongoose from "mongoose";
import { User } from "../../../../domain/entity/user";

const userSchema = new mongoose.Schema<User>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    createdAt: { type: Number, default: Date.now() },
    updatedAt: { type: Number, default: Date.now() }

})

export const UserModel = mongoose.model<User>('User', userSchema);