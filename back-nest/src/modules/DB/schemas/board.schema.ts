import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type BoardDocument = BoardDB & Document;

@Schema()
export class BoardDB {
  @Prop() // 문서의 속정 정의의
  title: string;

  @Prop()
  content: string;

  @Prop()
  writer: string;

  @Prop()
  created_at: Date;

  @Prop()
  updated_at: Date;
}

console.log('BOARD DB CONNECTED!!');
export const BoardSchema = SchemaFactory.createForClass(BoardDB);
