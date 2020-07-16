import * as mongoose from 'mongoose';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';

@Schema()

export class User {

    @Prop({ required: true })
    nickName: string;

    @Prop({ required: true })
    email: string;

    @Prop({ default: null })
    phone: string;

    @Prop({ default: [], ref: 'Post' })
    posts: [mongoose.Schema.Types.ObjectId];

    @Prop({ default: null })
    country: string;

    @Prop({ default: null })
    avatar: string;
}

export const UserSchema = SchemaFactory.createForClass(User)