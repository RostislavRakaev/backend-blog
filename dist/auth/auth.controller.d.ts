import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { TokenService } from 'src/token/token.service';
export declare class AuthController {
    private authService;
    private tokenService;
    constructor(authService: AuthService, tokenService: TokenService);
    signUp(res: any, createUserDto: CreateUserDto): Promise<any>;
    signIn(res: any, signInDto: SignInDto): Promise<any>;
    checkLogIn(res: any, token: any): Promise<any>;
}
