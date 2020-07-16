export class CreatePostDto {
    readonly author: string;
    readonly photo: string;
    readonly title: string;
    readonly description: string;
    readonly body: string;
    readonly date: number;
    isEdited?: boolean;
    dateOfEdit?: number;
}