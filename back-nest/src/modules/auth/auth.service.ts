import { Injectable } from "@nestjs/common";
import { compare } from 'bcrypt';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
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
        // const user = await this.userService.findOne(username);
        // if(!user || (user && !compare(password, user.password))){
        //     return null;
        // }

        const payload = {
            username: 'dhjeon',
            password: '1234@'
        }

        // const token = this.jwtService.sign(payload);
        // console.log(token)
        // return{
        //     username:'test_name',
        //     password:'test_pw'
        // }
       // return await this.userService.findUser(user.id);
    }

    async signToken(user){
        console.log(user);
        const payload = {
            username: user.username,
            password: user.password,
        };
        return {access_token: this.jwtService.sign(payload)}
    }

    async login(user: any){
        const payload = {
            username: user.username,
            password: user.password,
        };

        const token =  this.jwtService.sign(payload)

        return {
            access_token:token
        }
    }
}