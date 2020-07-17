import { Controller, Post, Res, Body, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('signUp')
    async signUp(@Res() res, @Body() createUserDto: CreateUserDto) {
        const newUser = await this.authService.signUp(createUserDto);
        if (newUser) return res.status(HttpStatus.OK).json(newUser);
        else return res.status(HttpStatus.UNPROCESSABLE_ENTITY).send('Email or nickname is already in use')
    }
}
