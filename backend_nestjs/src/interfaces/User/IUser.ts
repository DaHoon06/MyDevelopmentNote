import {IsString} from "class-validator";

export class IUser {
    @IsString()
    name: string;
    @IsString()
    email: string;

}