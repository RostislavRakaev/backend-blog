import { IUser } from './interfaces/user.interface';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { IPost } from 'src/post/interfaces/post.interface';
export declare class UserService {
    private readonly userModel;
    private readonly postModel;
    constructor(userModel: Model<IUser>, postModel: Model<IPost>);
    createUser(createUserDto: CreateUserDto): Promise<any>;
    findUser(_id: string): Promise<IUser>;
    findUserByEmail(email: string): Promise<IUser>;
    getUsersPosts(_id: string): Promise<IUser>;
}
