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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const create_user_dto_1 = require("../user/dto/create-user.dto");
const auth_service_1 = require("./auth.service");
const signin_dto_1 = require("./dto/signin.dto");
const token_service_1 = require("../token/token.service");
let AuthController = class AuthController {
    constructor(authService, tokenService) {
        this.authService = authService;
        this.tokenService = tokenService;
    }
    async signUp(res, createUserDto) {
        const newUser = await this.authService.signUp(createUserDto);
        if (newUser)
            return res.status(common_1.HttpStatus.OK).json(newUser);
        else
            return res.status(common_1.HttpStatus.UNPROCESSABLE_ENTITY).send('Email or nickname is already in use');
    }
    ;
    async signIn(res, signInDto) {
        const login = await this.authService.signIn(signInDto);
        return res.status(common_1.HttpStatus.OK).json({ token: login.token, uId: login.uId });
    }
    ;
    async checkLogIn(res, token) {
        const data = await this.authService.verifyToken(token.token);
        if (Date.now() > data.expireAt) {
            await this.tokenService.delete(data.uId, data.token);
            return res.status(common_1.HttpStatus.UNPROCESSABLE_ENTITY).send(null);
        }
        else
            return res.status(common_1.HttpStatus.OK).json({ token: data.token, uId: data.uId });
    }
    ;
};
__decorate([
    common_1.Post('signUp'),
    __param(0, common_1.Res()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signUp", null);
__decorate([
    common_1.Post('signIn'),
    __param(0, common_1.Res()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, signin_dto_1.SignInDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signIn", null);
__decorate([
    common_1.Post('checkToken'),
    __param(0, common_1.Res()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "checkLogIn", null);
AuthController = __decorate([
    common_1.Controller('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService, token_service_1.TokenService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map