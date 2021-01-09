import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
export declare class Post extends Document {
    author: mongoose.Schema.Types.ObjectId;
    photo: string;
    title: string;
    description: string;
    article: string;
    dateOfCreation: number;
    isEdited: boolean;
    dateOfEdit: number;
    tag: string;
}
export declare const PostSchema: mongoose.Schema<any>;
