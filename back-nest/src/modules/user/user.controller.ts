import { Body, Controller, Get, Post, Req, Res, Session, UseGuards } from "@nestjs/common";
import { userService } from "./user.service";
import { googleLoginDTO } from "./dto/google.login.dto";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "../auth/auth.service";
import {catchError} from "rxjs";

@Controller('user')
export class userController{
    constructor(
        private userService: userService,
        private authService: AuthService,
    ) {}

    @UseGuards(AuthGuard('local')) // 첫번째 필터 역할
    @Post('login')
    async login(@Body() userInfo){
        //TODO : 검사가 끝난 USER ID, PW로 SIGN 해서
        const {access_token} = await this.authService.signToken(userInfo);
        console.log(access_token)
        //TODO: 토큰값 반환
        return {
            result: true,
            data: {
                userInfo,
                access_token
            },
        }
    }

    @Post('googleLogin')
    async googleLogin(@Body() userInfo: googleLoginDTO){
        const {access_token} = await this.authService.signToken(userInfo);
        return {
            result: true,
            data: {
                userInfo,
                access_token
            },
        }
    }

    //로그인이 되었는지 확인
    @UseGuards(AuthGuard('jwt'))
    @Post('isLogin')
    async isLogin(@Req() req){
        // return this.authService.login(req.user);
    }


    @Post('emailCheck')
    async emailCheck(@Body() email: string,@Res() res){
        console.log('emailCheck : ',email);
        const data = await this.userService.emailCheck(email);
        return res.status(200).send(data);
    }

}