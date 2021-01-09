import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { TokenService } from 'src/token/token.service';
import { CreateUserTokenDto } from 'src/token/dto/create-user-token.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { IUser } from 'src/user/interfaces/user.interface';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dto/signin.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {

    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
        private readonly tokenService: TokenService,
        private readonly configService: ConfigService
    ) {
    }

    async signUp(createUserDto: CreateUserDto): Promise<IUser> {
        return await this.userService.createUser(createUserDto);
    }

    async signIn(signInDto: SignInDto): Promise<any> {
        const user = await (await this.userService.findUserByEmail(signInDto.email));
        if (user && (await bcrypt.compare(signInDto.password, user.password))) {
            return this.generateToken(user);
        }
        else throw new BadRequestException;
    }

    async generateToken(user: IUser): Promise<string> {
        const tokenPayload = {
            _id: user._id,
            nickName: user.nickName,
            role: user.role
        }

        const token = await this.jwtService.sign(tokenPayload, { secret: this.configService.get<string>('SECRET_JWT') });
        return await this.saveToken({ token, uId: user._id, expireAt: Date.now() + 30 * 60000 });
    }

    async verifyToken(token): Promise<any> {
        const data = await this.jwtService.verify(token, { secret: this.configService.get<string>('SECRET_JWT') });
        const getToken = await this.tokenService.get(data._id, token);
        if (data && getToken) return getToken;
        else throw new UnauthorizedException();
    }

    private async saveToken(createUserTokenDto: CreateUserTokenDto): Promise<any> {
        return await this.tokenService.create(createUserTokenDto);
    }
}
