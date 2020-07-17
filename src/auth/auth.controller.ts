import { Controller, Post, Res, Body, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('signUp')
    async signUp(@Res() res, @Body() createUserDto: CreateUserDto) {
        const newUser = await this.authService.signUp(createUserDto);
        if (newUser) return res.status(HttpStatus.OK).json(newUser);
        else return res.status(HttpStatus.UNPROCESSABLE_ENTITY).send('Email or nickname is already in use')
    }

    @Post('signIn')
    async signIn(@Res() res, @Body() signInDto: SignInDto) {
        const login = await this.authService.signIn(signInDto);
        return res.status(HttpStatus.OK).json({ accessToken: login.token });
    }
}
