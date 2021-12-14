import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { Transform } from "class-transformer";
import { NotIn } from "../custom/decorator/User/NotIn";

export class UserDTO {

    @NotIn('password',{message: 'password는 name과 같은 문자열을 포함할 수 없습니다.'})
    @Transform(params => {
        console.log(params);
        return params.value;
    })
    @IsString()
    @MinLength(2)
    @MaxLength(30)
    readonly name: string;

    @IsString()
    @IsEmail()
    @MaxLength(60)
    readonly email: string;

    @IsString()
    @Matches(/^[A-Za-z\d!@#$%^&*()]{8,30}$/)
    readonly password: string;
}