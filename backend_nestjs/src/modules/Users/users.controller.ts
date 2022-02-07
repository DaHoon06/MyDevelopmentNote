import {Body, Controller, Post, Query} from "@nestjs/common";
import {UsersService} from "./users.service";
import {UserDto} from "../../dto";
import {UserReturn} from "../../dto/users/user.return.prop";


@Controller('users')
export default class UsersController {
    constructor(private usersService: UsersService) {
    }

    @Post()
    public async createUser(@Body() userDTO: UserDto): Promise<UserReturn> {
        const { name, email, password } = userDTO;
        return await this.usersService.createUser(name,email,password);
    }

    // @Post('/email-verify')
    // async verifyEmail(@Query() dto: VerifyEmailDto): Promise<string> {
    //     const { signupVerifyToken } = dto;
    //     return await this.usersService.verifyEmail(signupVerifyToken);
    // }
}