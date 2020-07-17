import * as mongoose from 'mongoose';
import { IsString, IsNumber } from 'class-validator';

export class CreateUserTokenDto {

    @IsString()
    token: string;

    @IsString()
    uId: mongoose.Schema.Types.ObjectId;

    @IsNumber()
    expireAt: number;
}