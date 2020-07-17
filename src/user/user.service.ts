import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from './interfaces/user.interface';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { IPost } from 'src/post/interfaces/post.interface';
import * as _ from 'lodash';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<IUser>,
        @InjectModel('Post') private readonly postModel: Model<IPost>
    ) { }

    async createUser(createUserDto: CreateUserDto): Promise<any> {
        const matchOfEmail = await this.userModel.findOne({ email: createUserDto.email }).exec();
        const matchOfNickName = await this.userModel.findOne({ nickName: createUserDto.nickName }).exec();

        if (!matchOfEmail && !matchOfNickName) {
            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds);
            const hash = await bcrypt.hash(createUserDto.password, salt);
            const newUser = await new this.userModel(_.assignIn(createUserDto, { password: hash }));
            return newUser.save();
        }
        return null;

    }

    async getUsersPosts(_id: string): Promise<IUser> {
        return await this.userModel.findById(_id).populate('posts', this.postModel).exec();
    }
}
