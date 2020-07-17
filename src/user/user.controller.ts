import { Controller, Post, Res, Body, HttpStatus, Get, Param } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { ValidateObjectId } from 'src/post/pipes/validate-object-id.pipes';

@Controller('user')
export class UserController {

    constructor(private userService: UserService) { }

    @Post('register')
    async registerUser(@Res() res, @Body() createUserDto: CreateUserDto) {
        const newUser = await this.userService.createUser(createUserDto);
        if (newUser) return res.status(HttpStatus.OK).json(newUser);
        else return res.status(HttpStatus.UNPROCESSABLE_ENTITY).send('Email or nickname is already in use')
    }

    @Get(':id/posts')
    async getUsersPosts(@Res() res, @Param('id', new ValidateObjectId()) _id: string) {
        const usersPosts = await this.userService.getUsersPosts(_id);
        return res.status(HttpStatus.OK).json(usersPosts);
    }
}
