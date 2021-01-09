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
exports.PostController = void 0;
const common_1 = require("@nestjs/common");
const post_service_1 = require("./post.service");
const create_post_dto_1 = require("./dto/create-post.dto");
const validate_object_id_pipes_1 = require("./pipes/validate-object-id.pipes");
const auth_service_1 = require("../auth/auth.service");
let PostController = class PostController {
    constructor(postService, authService) {
        this.postService = postService;
        this.authService = authService;
    }
    async getPosts(res) {
        const posts = await this.postService.getPosts();
        return res.status(common_1.HttpStatus.OK).json(posts);
    }
    async getPost(res, _id) {
        const post = await this.postService.getPost(_id);
        if (!post)
            throw new common_1.NotFoundException('Post Does not exists');
        return res.status(common_1.HttpStatus.OK).json(post);
    }
    async addPost(res, createPostDto, jwtToken) {
        await this.authService.verifyToken(jwtToken.replace('Bearer ', ''));
        const newPost = await this.postService.addPost(createPostDto);
        return res.status(common_1.HttpStatus.OK).json(newPost);
    }
    async editPost(res, _id, createPostTdo, jwtToken) {
        await this.authService.verifyToken(jwtToken.replace('Bearer ', ''));
        const editedPost = await this.postService.editPost(_id, createPostTdo);
        return res.status(common_1.HttpStatus.OK).json(editedPost);
    }
    async deletePost(res, _id, jwtToken) {
        await this.authService.verifyToken(jwtToken.replace('Bearer ', ''));
        const deletedPost = await this.postService.deletePost(_id);
        return res.status(common_1.HttpStatus.OK).json(deletedPost);
    }
};
__decorate([
    common_1.Get('posts'),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getPosts", null);
__decorate([
    common_1.Get('post/:id'),
    __param(0, common_1.Res()), __param(1, common_1.Param('id', new validate_object_id_pipes_1.ValidateObjectId())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getPost", null);
__decorate([
    common_1.Post('post'),
    __param(0, common_1.Res()), __param(1, common_1.Body()), __param(2, common_1.Headers('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_post_dto_1.CreatePostDto, Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "addPost", null);
__decorate([
    common_1.Put('post/:id'),
    __param(0, common_1.Res()), __param(1, common_1.Param('id', new validate_object_id_pipes_1.ValidateObjectId())), __param(2, common_1.Body()), __param(3, common_1.Headers('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, create_post_dto_1.CreatePostDto, Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "editPost", null);
__decorate([
    common_1.Delete('post/:id'),
    __param(0, common_1.Res()), __param(1, common_1.Param('id', new validate_object_id_pipes_1.ValidateObjectId())), __param(2, common_1.Headers('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "deletePost", null);
PostController = __decorate([
    common_1.Controller('blog'),
    __metadata("design:paramtypes", [post_service_1.PostService,
        auth_service_1.AuthService])
], PostController);
exports.PostController = PostController;
//# sourceMappingURL=post.controller.js.map