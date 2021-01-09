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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const post_interface_1 = require("../post/interfaces/post.interface");
const _ = require("lodash");
const bcrypt = require("bcrypt");
let UserService = class UserService {
    constructor(userModel, postModel) {
        this.userModel = userModel;
        this.postModel = postModel;
    }
    async createUser(createUserDto) {
        const matchOfEmail = await this.userModel.findOne({ email: createUserDto.email }).exec();
        const matchOfNickName = await this.userModel.findOne({ nickName: createUserDto.nickName }).exec();
        if (!matchOfEmail && !matchOfNickName) {
            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds);
            const hash = await bcrypt.hash(createUserDto.password, salt);
            const newUser = await new this.userModel(_.assignIn(createUserDto, { password: hash }));
            return newUser.save();
        }
        return null;
    }
    async findUser(_id) {
        return await this.userModel.findById(_id).exec();
    }
    async findUserByEmail(email) {
        return await this.userModel.findOne({ email });
    }
    async getUsersPosts(_id) {
        return await this.userModel.findById(_id).populate('posts', this.postModel).exec();
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('User')),
    __param(1, mongoose_1.InjectModel('Post')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map