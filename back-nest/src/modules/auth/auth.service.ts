import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { userService } from "../user/user.service";
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
    constructor(
        private userService: userService,
        private jwtService: JwtService,
    ) {}

    async checkToken(token){
        try{
            this.jwtService.verify(token);
            console.log('인증성공');
            const userInfo = this.jwtService.decode(token);
            console.log(userInfo)
        }catch (e) {
            console.log('인증 에러')
        }
    }

    async validateUser(username: string, password: string): Promise<any>{
        const user = await this.userService.validateCheck(username);
        const hashPw = crypto.createHash('sha512').update(password).digest('hex').toString();

        if(!user || user.password !== hashPw){
            console.log('비밀번호 틀림');
            return null;
        }
        return{
            result: true,
            info:{
                email: user.email,
                phone: user.phone,
                name: user.name
            }
        }
    }
    async signToken(user){
        const payload = {
            username: user.id,
            password: user.password,
        };
        const {email, name, phone} = await this.userService.validateCheck(user.id);

        return {
            userData: {
                email,
                name,
                phone
            },
            access_token: this.jwtService.sign(payload)
        }
    }

    async signToken_google(user){
        const payload = {
            username: user.username,
            password: user.password,
        };
        return { access_token: this.jwtService.sign(payload) }
    }

    async login(user: any){
        const payload = {
            username: user.username,
            password: user.password,
        };

        const token =  this.jwtService.sign(payload)
        return {
            access_token: token
        }
    }
}