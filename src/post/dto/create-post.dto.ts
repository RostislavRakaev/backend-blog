export class CreatePostDto {
    readonly author: string;
    readonly photo: string;
    readonly title: string;
    readonly description: string;
    readonly article: string;
    readonly dateOfCreation: number;
    readonly tag: string;
    readonly isEdited?: boolean;
    readonly dateOfEdit?: number;
    readonly viewOfPost?: number;
    readonly _id?: string;
}