import {Body, Controller, Post} from "@nestjs/common";
import {UsersService} from "./users.service";
import {UserDTO} from "../../dto/UserDTO";

@Controller('users')
export default class UsersController {
    constructor(private usersService: UsersService) {
    }

    @Post()
    public async createUser(@Body() userDTO: UserDTO): Promise<void> {
        const { name, email, password } = userDTO;
        await this.usersService.createUser(name,email,password);
    }
}