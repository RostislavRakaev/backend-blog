export interface IReadableUser {
    readonly nickName: string;
    readonly email: string;
    readonly phone: string;
    readonly posts: [string];
    readonly country: string;
    readonly avatar: string;
    readonly role: string;
    accessToken?: string;
}