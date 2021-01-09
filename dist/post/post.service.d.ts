import { Model } from 'mongoose';
import { IPost } from './interfaces/post.interface';
import { CreatePostDto } from './dto/create-post.dto';
import { IUser } from 'src/user/interfaces/user.interface';
export declare class PostService {
    private readonly postModel;
    private readonly userModel;
    constructor(postModel: Model<IPost>, userModel: Model<IUser>);
    getPosts(): Promise<IPost[]>;
    getPost(_id: string): Promise<IPost>;
    addPost(createPostDto: CreatePostDto): Promise<IPost>;
    editPost(_id: string, createPostDto: CreatePostDto): Promise<any>;
    deletePost(_id: string): Promise<any>;
}
