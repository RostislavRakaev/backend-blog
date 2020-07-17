import { Controller, Post, Res, Body, HttpStatus, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { ValidateObjectId } from 'src/post/pipes/validate-object-id.pipes';

@Controller('user')
export class UserController {

    constructor(private userService: UserService) { }

    @Get(':id/posts')
    async getUsersPosts(@Res() res, @Param('id', new ValidateObjectId()) _id: string) {
        const usersPosts = await this.userService.getUsersPosts(_id);
        return res.status(HttpStatus.OK).json(usersPosts.posts);
    }
}
