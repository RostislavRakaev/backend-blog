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
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_interface_1 = require("../user/interfaces/user.interface");
const _ = require("lodash");
let PostService = class PostService {
    constructor(postModel, userModel) {
        this.postModel = postModel;
        this.userModel = userModel;
    }
    async getPosts() {
        return await this.postModel.find().populate('author', this.userModel).exec();
    }
    async getPost(_id) {
        return await this.postModel.findById(_id).populate('author', this.userModel).exec();
    }
    async addPost(createPostDto) {
        const newPost = await new this.postModel(createPostDto);
        await this.userModel.findByIdAndUpdate(createPostDto.author, { $push: { posts: newPost._id } });
        return newPost.save();
    }
    async editPost(_id, createPostDto) {
        return await this.postModel.findByIdAndUpdate(_id, _.assignIn(createPostDto, { isEdited: true, dateOfEdit: Date.now() }));
    }
    async deletePost(_id) {
        return await this.postModel.findByIdAndRemove(_id);
    }
};
PostService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Post')),
    __param(1, mongoose_1.InjectModel('User')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], PostService);
exports.PostService = PostService;
//# sourceMappingURL=post.service.js.map