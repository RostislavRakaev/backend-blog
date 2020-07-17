export class CreatePostDto {
    readonly author: string;
    readonly photo: string;
    readonly title: string;
    readonly description: string;
    readonly body: string;
    readonly dateOfCreation: string;
    readonly isEdited?: boolean;
    readonly dateOfEdit?: string;
    readonly viewOfPost?: number;
    readonly _id?: string;
}