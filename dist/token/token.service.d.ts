import { Model } from 'mongoose';
import { IUserToken } from './interfaces/user-token.interface';
import { CreateUserTokenDto } from './dto/create-user-token.dto';
export declare class TokenService {
    private readonly tokenModel;
    constructor(tokenModel: Model<IUserToken>);
    create(createUserTokenDto: CreateUserTokenDto): Promise<IUserToken>;
    exists(uId: string, token: string): Promise<boolean>;
    get(uId: string, token: string): Promise<IUserToken>;
    delete(uId: string, token: string): Promise<any>;
    deleteAll(uId: string): Promise<any>;
}
