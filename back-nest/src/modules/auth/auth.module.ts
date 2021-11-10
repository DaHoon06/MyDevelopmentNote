import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./local.strategy";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "../../jwt/jwt.strategy";
import { ConfigService } from "@nestjs/config";
import { ENV } from "../../config/env.config";
import {userService} from "../user/user.service";
import {UserModule} from "../user/user.module";

@Module({
    imports: [
        PassportModule,
        UserModule,
        JwtModule.register({
            secret: ENV.JWT_KEY+'',
            signOptions: { expiresIn: '5m' },
        }),
    ],
    providers: [AuthService,LocalStrategy,JwtStrategy,ConfigService],
    exports: [AuthService]
})
export class AuthModule{}