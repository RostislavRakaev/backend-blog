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

    @Get('post')
    async getPost(@Res() res, @Query('id', new ValidateObjectId()) postId) {
        const post = await this.postService.getPost(postId);
        if (!post) throw new NotFoundException('Post Does not exists');
        return res.status(HttpStatus.OK).json(post);
    }

    @Post('post')
    async addPost(@Res() res, @Body() createPostDto: CreatePostDto) {
        const newPost = await this.postService.addPost(createPostDto);
        return res.status(HttpStatus.OK).json(newPost);
    }

    @Put('post')
    async editPost(@Res() res, @Query('id', new ValidateObjectId()) postId, @Body() createPostTdo: CreatePostDto) {
        const editedPost = await this.postService.editPost(postId, createPostTdo);
        return res.status(HttpStatus.OK).json(editedPost);
    }

    @Delete('post')
    async deletePost(@Res() res, @Query('id', new ValidateObjectId()) postId) {
        const deletedPost = await this.postService.deletePost(postId);
        return res.status(HttpStatus.OK).json(deletedPost);
    }
}
