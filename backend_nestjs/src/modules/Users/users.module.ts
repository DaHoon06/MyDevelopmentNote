import {Module} from "@nestjs/common";
import {EmailModule} from "../email/email.module";
import UsersController from "./users.controller";
import {UsersService} from "./users.service";
import {UserEntity} from "../../db/repository/User/user.entity";

@Module({
    imports:[EmailModule,UserEntity],
    controllers:[UsersController],
    providers: [UsersService]
})
export class UsersModule{}