import {Module} from "@nestjs/common";

import {userService} from "./user.service";
import {userController} from "./user.controller";
import {AuthService} from "../auth/auth.service";
import {JwtModule} from "@nestjs/jwt";

@Module({
    imports:[
        JwtModule.register({
            secret: 'test',
            signOptions: { expiresIn: '3600m' },
        }),
    ],
    providers: [userService,AuthService],
    exports: [userService],
    controllers: [userController],
})
export class UserModule {}