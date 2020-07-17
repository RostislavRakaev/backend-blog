import { SchemaFactory, Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose'
import * as mongoose from 'mongoose'
import * as moment from 'moment';

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
    body: string;

    @Prop({ default: moment().toISOString() })
    dateOfCreation: string;

    @Prop({ default: false })
    isEdited: boolean;

    @Prop({ default: null })
    dateOfEdit: string;

    @Prop({ default: 0 })
    viewOfPost: number;
}

export const PostSchema = SchemaFactory.createForClass(Post)