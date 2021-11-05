import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";

export type CommentDocument = CommentDB & Document;

@Schema()
export class CommentDB {
    @Prop()
    b_id: string;

    @Prop()
    c_content: string;

    @Prop()
    c_writer: string;

    @Prop()
    created_at: Date;

    @Prop()
    updated_at: Date;
}

console.log('Comment DB CONNECTED!!');
export const CommentSchema = SchemaFactory.createForClass(CommentDB);