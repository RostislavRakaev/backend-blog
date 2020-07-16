import * as mongoose from 'mongoose';
import { Document } from 'mongoose'
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';

@Schema()

export class User extends Document {

    @Prop({ required: true })
    nickName: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ default: null })
    phone: string;

    @Prop({ default: null })
    country: string;

    @Prop({ default: null })
    avatar: string;

    @Prop({ default: [], ref: 'Post' })
    posts: () => mongoose.Schema.Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User)