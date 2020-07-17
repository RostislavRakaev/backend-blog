import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IPost } from './interfaces/post.interface';
import { CreatePostDto } from './dto/create-post.dto';
import { IUser } from 'src/user/interfaces/user.interface';
import * as _ from 'lodash';

@Injectable()
export class PostService {
    constructor(
        @InjectModel('Post') private readonly postModel: Model<IPost>,
        @InjectModel('User') private readonly userModel: Model<IUser>
    ) { }

    async getPosts(): Promise<IPost[]> {
        return await this.postModel.find().populate('author', this.userModel).exec();
    }

    async getPost(_id: string): Promise<IPost> {
        return await this.postModel.findById(_id).populate('author', this.userModel).exec();
    }

    async addPost(createPostDto: CreatePostDto): Promise<IPost> {
        const newPost = await new this.postModel(createPostDto);
        await this.userModel.findByIdAndUpdate(createPostDto.author, { $push: { posts: newPost._id } });
        return newPost.save();
    }

    async editPost(_id: string, createPostDto: CreatePostDto): Promise<any> {
        return await this.postModel.findByIdAndUpdate(_id, _.assignIn(createPostDto, { isEdited: true, dateOfEdit: Date.now() }));
    }

    async deletePost(_id: string): Promise<any> {
        return await this.postModel.findByIdAndRemove(_id);
    }
}
