import {Body, Controller, Get, Post, Req, Res, Session, UseGuards} from "@nestjs/common";
import {userService} from "./user.service";
import {googleLoginDTO} from "./dto/google.login.dto";
import {AuthGuard} from "@nestjs/passport";
import {AuthService} from "../auth/auth.service";

@Controller('user')
export class userController{
    constructor(
        private userService: userService,
        private authService: AuthService,
    ) {}

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login_(@Body() userInfo, @Session() session){
        //TODO : 검사가 끝난 USER ID, PW로 SIGN 해서
        const {access_token} = await this.authService.signToken(userInfo);

        console.log(access_token)

        // console.log(body)
        // const access_token = (await this.authService.login(req.user)).access_token;
        // await res.cookie('Authorization',access_token);

        //TODO : 토큰값 반환
        return userInfo;
    }

    @Post('googleLogin')
    async googleLogin(@Body()userInfo: googleLoginDTO){
        console.log(userInfo);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('isLogin')
    async login(@Req() req){
        // return this.authService.login(req.user);
    }

    @Post('emailCheck')
    async emailCheck(@Body() email: string,@Res() res){
        console.log('emailCheck : ',email);
        const data = await this.userService.emailCheck(email);
        console.log(data);
        return res.status(200).send(data);
    }

}