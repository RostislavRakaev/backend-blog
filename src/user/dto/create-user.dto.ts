export class CreateUserDto {
    readonly nickName: string;
    readonly email: string;
    readonly phone: string;
    readonly posts: [string];
    readonly country: string;
    readonly avatar: string;
    readonly password: string;
    readonly role: string;
}