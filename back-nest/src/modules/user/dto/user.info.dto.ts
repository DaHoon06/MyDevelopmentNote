import {IsString} from "class-validator";

export class UserInfoDto {
    @IsString()
    email: string;

    @IsString()
    password: string;

    @IsString()
    name: string;

    @IsString()
    phone: string;
}