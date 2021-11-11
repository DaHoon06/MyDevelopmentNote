import { Body, Controller, Get, Post, Req, Res, Session, UseGuards } from "@nestjs/common";
import { userService } from "./user.service";
import { googleLoginDTO } from "./dto/google.login.dto";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "../auth/auth.service";
import {UserInfoDto} from "./dto/user.info.dto";


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
        console.log(userInfo,'넘어온 데이터')
        const { access_token, userData } = await this.authService.signToken(userInfo);
        const data = {
                ...userData,
                access_token
        }
        console.log('LOGIN RESULT ------------',new Date().getSeconds())
        console.log(data);
        return {
            result: true,
            ...data
        }
    }

    @Post('googleLogin')
    async googleLogin(@Body() userInfo: googleLoginDTO){
        const { access_token } = await this.authService.signToken_google(userInfo);
        const data = {
            ...userInfo,
            access_token
        }
        return {
            result: true,
            ...data
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
        const data = await this.userService.emailCheck(email);
        if(data.msg === 'ok'){return res.send({msg: 'noData'});}
        return res.send({msg: 'exist'});
    }

    @Post('signUp')
    async join(@Body() userInfo: UserInfoDto){
        const data = await this.userService.join(userInfo);
        if(data){
            return { result: true }
        }
        return { result: false }
    }

}