import { Document } from 'mongoose';
export interface IUser extends Document {
    readonly nickName: string;
    readonly email: string;
    readonly phone: string;
    readonly posts: [string];
    readonly country: string;
    readonly avatar: string;
    readonly role: string;
    readonly password: string;
}
