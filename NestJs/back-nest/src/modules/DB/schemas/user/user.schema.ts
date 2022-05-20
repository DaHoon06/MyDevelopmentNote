import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";

export type UserDocument = UserDB & Document;

@Schema()
export class UserDB {

    @Prop({ type: String, required: true })
    email: string;

    @Prop({ type: String, required: true })
    password: string;

    @Prop({ type: String, required: true })
    name: string;

    @Prop({ type: String, required: true })
    phone: string;
}

console.log('User DB CONNECTED!!');
export const UserSchema = SchemaFactory.createForClass(UserDB);