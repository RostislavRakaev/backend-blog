import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { AuthService } from 'src/auth/auth.service';
export declare class PostController {
    private readonly postService;
    private readonly authService;
    constructor(postService: PostService, authService: AuthService);
    getPosts(res: any): Promise<any>;
    getPost(res: any, _id: string): Promise<any>;
    addPost(res: any, createPostDto: CreatePostDto, jwtToken: any): Promise<any>;
    editPost(res: any, _id: any, createPostTdo: CreatePostDto, jwtToken: any): Promise<any>;
    deletePost(res: any, _id: any, jwtToken: any): Promise<any>;
}
