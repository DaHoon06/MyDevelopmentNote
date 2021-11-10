import {Module} from "@nestjs/common";

import {userService} from "./user.service";
import {userController} from "./user.controller";
import {AuthService} from "../auth/auth.service";
import {JwtModule} from "@nestjs/jwt";
import {MongooseModule} from "@nestjs/mongoose";
import {UserDB, UserSchema} from "../DB/schemas/user/user.schema";

@Module({
    imports:[
        JwtModule.register({
            secret: 'test',
            signOptions: { expiresIn: '3600m' },
        }),
        MongooseModule.forFeature([{name: UserDB.name, schema: UserSchema}]),
    ],
    providers: [userService,AuthService],
    exports: [userService],
    controllers: [userController],
})
export class UserModule {}