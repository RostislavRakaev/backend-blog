import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from 'passport-local';
import { ConfigService } from "@nestjs/config";
import { TokenService } from "src/token/token.service";
import { ExtractJwt } from "passport-jwt";
import { IUser } from "src/user/interfaces/user.interface";

@Injectable()

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly configService: ConfigService,
        private readonly tokenService: TokenService
    ) {
        // super({
        //     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        //     secretOrKey: configService.get<string>('SECRET_JWT'),
        //     passReqToCallBack: true
        // })

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'ULTIMATE_SECRET_JWT',
            passReqToCallBack: true
        })
    }

    async validate(req, user: Partial<IUser>) {
        const token = req.headers.authorization.slice(7);
        const tokenExists = await this.tokenService.exists(user._id, token);
        if (tokenExists) return user;
        else throw new UnauthorizedException();
    }
}