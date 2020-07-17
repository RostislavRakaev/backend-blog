import { Controller, Get, Res, HttpStatus, Post, Req, Body, Param, NotFoundException, Query, Put, Delete } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { ValidateObjectId } from './pipes/validate-object-id.pipes';

@Controller('blog')
export class PostController {
    constructor(private readonly postService: PostService) { }

    @Get('posts')
    async getPosts(@Res() res) {
        const posts = await this.postService.getPosts();
        return res.status(HttpStatus.OK).json(posts);
    }

    @Get('post/:id')
    async getPost(@Res() res, @Param('id', new ValidateObjectId()) _id: string) {
        const post = await this.postService.getPost(_id);
        if (!post) throw new NotFoundException('Post Does not exists');
        return res.status(HttpStatus.OK).json(post);
    }

    @Post('post')
    async addPost(@Res() res, @Body() createPostDto: CreatePostDto) {
        const newPost = await this.postService.addPost(createPostDto);
        return res.status(HttpStatus.OK).json(newPost);
    }

    @Put('post/:id')
    async editPost(@Res() res, @Param('id', new ValidateObjectId()) _id, @Body() createPostTdo: CreatePostDto) {
        const editedPost = await this.postService.editPost(_id, createPostTdo);
        return res.status(HttpStatus.OK).json(editedPost);
    }

    @Delete('post/:id')
    async deletePost(@Res() res, @Param('id', new ValidateObjectId()) _id) {
        const deletedPost = await this.postService.deletePost(_id);
        return res.status(HttpStatus.OK).json(deletedPost);
    }
}
