import {IsString} from "class-validator";

export class googleLoginDTO {
    @IsString()
    Re: string; //name

    @IsString()
    oK: string // img

    @IsString()
    Yt: string //email
}