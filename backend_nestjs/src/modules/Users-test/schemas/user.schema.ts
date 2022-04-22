import { Document } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type UserDocument = User & Document;

@Schema()
export class User{
  @Prop()
  id: string;

  @Prop()
  pw: string;
}

export const UserSchema = SchemaFactory.createForClass(User);