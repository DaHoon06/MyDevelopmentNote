import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller('token')
export class jwtTokenCheck {

    @UseGuards(AuthGuard('jwt'))
    @Get('/check')
    async isToken(){
        console.log('토큰 여부 확인')
    }
}