import { UserService } from './user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getUsersPosts(res: any, _id: string): Promise<any>;
}
