import {Body, Controller, Post, Req, Res, UseGuards} from "@nestjs/common";
import {userService} from "./user.service";
import {googleLoginDTO} from "./dto/google.login.dto";
import {AuthGuard} from "@nestjs/passport";

@Controller('user')
export class userController{
    constructor(private userService: userService) {}

    @Post('googleLogin')
    async googleLogin(@Body()userInfo: googleLoginDTO){
        console.log(userInfo);
    }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Req() req){
        return req.user;
    }

    @Post('emailCheck')
    async emailCheck(@Body() email: string,@Res() res){
        console.log('emailCheck : ',email);
        const data = await this.userService.emailCheck(email);
        console.log(data);
        return res.status(200).send(data);
    }

}