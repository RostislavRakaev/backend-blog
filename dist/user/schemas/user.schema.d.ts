import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
export declare class User extends Document {
    nickName: string;
    email: string;
    password: string;
    phone: string;
    country: string;
    avatar: string;
    posts: () => mongoose.Schema.Types.ObjectId[];
}
export declare const UserSchema: mongoose.Schema<any>;
