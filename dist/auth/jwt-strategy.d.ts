import { Strategy } from 'passport-local';
import { ConfigService } from "@nestjs/config";
import { TokenService } from "src/token/token.service";
import { IUser } from "src/user/interfaces/user.interface";
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly configService;
    private readonly tokenService;
    constructor(configService: ConfigService, tokenService: TokenService);
    validate(req: any, user: Partial<IUser>): Promise<Partial<IUser>>;
}
export {};
