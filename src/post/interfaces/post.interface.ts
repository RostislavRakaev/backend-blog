import { Document } from 'mongoose';

export interface IPost extends Document {
    readonly author: string;
    readonly photo: string;
    readonly title: string;
    readonly description: string;
    readonly article: string;
    readonly dateOfCreation: number;
    readonly tag: string;
    readonly isEdited?: boolean;
    readonly dateOfEdit?: number;
}