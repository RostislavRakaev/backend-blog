import * as mongoose from 'mongoose';
export declare class Token extends mongoose.Document {
    token: string;
    uId: mongoose.Schema.Types.ObjectId;
    expireAt: number;
    createdAt: number;
}
export declare const TokenSchema: mongoose.Schema<any>;
