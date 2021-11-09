import {Module} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {PassportModule} from "@nestjs/passport";
import {LocalStrategy} from "./local.strategy";
import {JwtModule} from "@nestjs/jwt";
import {JwtStrategy} from "../../jwt/jwt.strategy";
import {ConfigService} from "@nestjs/config";

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: 'test',
            signOptions: { expiresIn: '3600m' },
        }),
    ],
    providers: [AuthService,LocalStrategy,JwtStrategy,ConfigService],
    exports: [AuthService]
})
export class AuthModule{}