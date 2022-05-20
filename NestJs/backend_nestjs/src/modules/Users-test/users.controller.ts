import { Body, Controller, Get, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { AuthsService } from "../auths/auths.service";

@Controller()
export class UsersController {
  constructor(
    private usersService:UsersService,
    // private authsService:AuthsService,
  ) {  }

  @Post('/login')
  async login(@Body() userData: CreateUserDto){
    console.log('###');
    console.log(userData);
    const user =  await this.usersService.getById(userData);
    // const{ access_token } = await this.authsService.signToken(user);
    // const data = {
    //   ...user,
    //   access_token
    // }
  }

  @Post('/signup')
  async signup(@Body() userData: CreateUserDto){
    console.log('###');
    console.log(userData);
    return await this.usersService.signup(userData);
  }


}
