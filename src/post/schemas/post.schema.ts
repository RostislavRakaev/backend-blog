import { SchemaFactory, Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose'
import * as mongoose from 'mongoose'

@Schema()

export class Post extends Document {
    @Prop({ required: true, ref: 'User' })
    author: mongoose.Schema.Types.ObjectId;

    @Prop({ required: true })
    photo: string;

    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    article: string;

    @Prop({ default: Date.now() })
    dateOfCreation: number;

    @Prop({ default: false })
    isEdited: boolean;

    @Prop({ default: null })
    dateOfEdit: number;

    @Prop({ required: true })
    tag: string;
}

export const PostSchema = SchemaFactory.createForClass(Post)