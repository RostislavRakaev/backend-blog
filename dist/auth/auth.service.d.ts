import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { TokenService } from 'src/token/token.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { IUser } from 'src/user/interfaces/user.interface';
import { SignInDto } from './dto/signin.dto';
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private readonly jwtService;
    private readonly userService;
    private readonly tokenService;
    private readonly configService;
    constructor(jwtService: JwtService, userService: UserService, tokenService: TokenService, configService: ConfigService);
    signUp(createUserDto: CreateUserDto): Promise<IUser>;
    signIn(signInDto: SignInDto): Promise<any>;
    generateToken(user: IUser): Promise<string>;
    verifyToken(token: any): Promise<any>;
    private saveToken;
}
