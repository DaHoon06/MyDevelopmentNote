import {Body, Controller, Post, Res} from "@nestjs/common";
import {userService} from "./user.service";

@Controller('user')
export class userController{
    constructor(private userService: userService) {}

    @Post('emailCheck')
    async emailCheck(@Body() email: string,@Res() res){
        console.log('emailCheck : ',email);
        const data = await this.userService.emailCheck(email);
        console.log(data);
        return res.status(200).send(data);
    }

}