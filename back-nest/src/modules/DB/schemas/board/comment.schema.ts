import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import * as mongoose from "mongoose";

export type CommentDocument = CommentDB & Document;

@Schema()
export class CommentDB {
    @Prop({ type: mongoose.Schema.Types.ObjectId, default: null})
    b_id: string;

    @Prop({ type: String, required: true })
    c_content: string;

    @Prop({ type: String, required: true })
    c_writer: string;

    @Prop({ default: new Date() })
    created_at: Date;

    @Prop({ default: new Date() })
    updated_at: Date;
}

console.log('Comment DB CONNECTED!!');
export const CommentSchema = SchemaFactory.createForClass(CommentDB);