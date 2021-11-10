import { Injectable } from "@nestjs/common";
import { compare } from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { userService } from "../user/user.service";

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
        const user = await this.userService.findOne(username);
        //console.log(user);
        if(user.password !== password){
            console.log('비밀번호 틀림');
            return null;
        }
        const payload = {
            username: username,
            password: password
        }
        const token = this.jwtService.sign(payload);
        //console.log(token);
        return{
            result: true,
            data: {
                user,
                token
            }
        }
    }

    async signToken(user){
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