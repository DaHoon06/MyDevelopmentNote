import {Injectable, UnauthorizedException} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {Strategy} from "passport-local";
import {AuthService} from "./auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            usernameField:'username',
            passwordField:'password',
        });
    }

    async validate(username: string, password: string): Promise<any> {
        console.log(username,password);
        const user = await this.authService.validateUser(username, password);
        //TODO: 있는지 없는지만 따져서 유저 정보 자체를 반환 // DB에서 유효성 검사
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}