import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';

@Schema()

export class Token extends mongoose.Document {
    @Prop({ required: true })
    token: string;

    @Prop({ required: true, ref: 'User' })
    uId: mongoose.Schema.Types.ObjectId;

    @Prop({ required: true })
    expireAt: Date;

    @Prop({ default: Date.now() })
    createdAt: Date;
}

export const TokenSchema = SchemaFactory.createForClass(Token);