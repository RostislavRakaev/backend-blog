"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../user/user.service");
const token_service_1 = require("../token/token.service");
const create_user_token_dto_1 = require("../token/dto/create-user-token.dto");
const create_user_dto_1 = require("../user/dto/create-user.dto");
const user_interface_1 = require("../user/interfaces/user.interface");
const bcrypt = require("bcrypt");
const config_1 = require("@nestjs/config");
let AuthService = class AuthService {
    constructor(jwtService, userService, tokenService, configService) {
        this.jwtService = jwtService;
        this.userService = userService;
        this.tokenService = tokenService;
        this.configService = configService;
    }
    async signUp(createUserDto) {
        return await this.userService.createUser(createUserDto);
    }
    async signIn(signInDto) {
        const user = await (await this.userService.findUserByEmail(signInDto.email));
        if (user && (await bcrypt.compare(signInDto.password, user.password))) {
            return this.generateToken(user);
        }
        else
            throw new common_1.BadRequestException;
    }
    async generateToken(user) {
        const tokenPayload = {
            _id: user._id,
            nickName: user.nickName,
            role: user.role
        };
        const token = await this.jwtService.sign(tokenPayload, { secret: this.configService.get('SECRET_JWT') });
        return await this.saveToken({ token, uId: user._id, expireAt: Date.now() + 30 * 60000 });
    }
    async verifyToken(token) {
        const data = await this.jwtService.verify(token, { secret: this.configService.get('SECRET_JWT') });
        const getToken = await this.tokenService.get(data._id, token);
        if (data && getToken)
            return getToken;
        else
            throw new common_1.UnauthorizedException();
    }
    async saveToken(createUserTokenDto) {
        return await this.tokenService.create(createUserTokenDto);
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        user_service_1.UserService,
        token_service_1.TokenService,
        config_1.ConfigService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map