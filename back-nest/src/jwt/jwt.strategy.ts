import {Injectable} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import {ConfigService} from "@nestjs/config";
import {JwtService} from "@nestjs/jwt";

const fromAuthCookie = () => {
    return (req) => {
        let token = null;
        if(req && req.cookies){
            token = req.cookies['Authorization'];
        }
        return token;
    }
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'test',
        });
    }
    async validate(payload: any){
        return { username: payload.username, password: payload.password };
    }
}