import { Document } from 'mongoose';

export interface IPost extends Document {
    readonly author: string;
    readonly photo: string;
    readonly title: string;
    readonly description: string;
    readonly body: string;
    readonly dateOfCreation: number;
    readonly isEdited?: boolean;
    readonly dateOfEdit?: number;
    readonly viewOfPost?: number;
}