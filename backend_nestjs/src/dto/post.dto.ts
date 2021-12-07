import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class PostDto {
    @IsString()
    @MinLength(1)
    @MaxLength(100)
    title: string;

    @IsString()
    @MinLength(1)
    @MaxLength(1000)
    content: string;

    @IsEmail()
    email: string;
}