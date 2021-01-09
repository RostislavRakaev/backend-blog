import * as mongoose from 'mongoose';
export declare class CreateUserTokenDto {
    token: string;
    uId: mongoose.Schema.Types.ObjectId;
    expireAt: number;
}
