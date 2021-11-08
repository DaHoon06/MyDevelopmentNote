import {Module} from "@nestjs/common";

import {userService} from "./user.service";
import {userController} from "./user.controller";


@Module({
    imports:[

    ],
    controllers: [userController],
    providers: [userService],
})
export class UserModule {}