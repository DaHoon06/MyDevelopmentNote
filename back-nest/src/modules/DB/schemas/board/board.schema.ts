import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type BoardDocument = BoardDB & Document;

@Schema()
export class BoardDB {
  @Prop({ type: String, required: true }) // 문서의 속정 정의의
  title: string;

  @Prop({ type: String, required: true })
  content: string;

  @Prop({ type: String, required: true })
  writer: string;

  @Prop({ default: new Date() })
  created_at: Date;

  @Prop({ default: new Date() })
  updated_at: Date;
}

console.log('BOARD DB CONNECTED!!');
export const BoardSchema = SchemaFactory.createForClass(BoardDB);
