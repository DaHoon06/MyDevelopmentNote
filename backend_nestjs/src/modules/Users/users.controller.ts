import {Body, Controller, Post, Query} from "@nestjs/common";
import {UsersService} from "./users.service";
import {UserDTO} from "../../dto/UserDTO";
import {VerifyEmailDto} from "../../dto/verifyEamilDto";

@Controller('users')
export default class UsersController {
    constructor(private usersService: UsersService) {
    }

    @Post()
    public async createUser(@Body() userDTO: UserDTO): Promise<void> {
        const { name, email, password } = userDTO;
        await this.usersService.createUser(name,email,password);
    }

    @Post('/email-verify')
    async verifyEmail(@Query() dto: VerifyEmailDto): Promise<string> {
        const { signupVerifyToken } = dto;
        return await this.usersService.verifyEmail(signupVerifyToken);
    }
}