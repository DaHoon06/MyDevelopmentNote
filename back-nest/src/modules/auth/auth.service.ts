import {Injectable} from "@nestjs/common";
import {userService} from "../user/user.service";
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private userService: userService
    ) {}

    async validateUser(username: string, password: string): Promise<any>{
        // const user = await this.userService.getUserInfo(username);
    //     if(!user || (user && !compare(password, user.password))){
    //         return null;
    //     }
        return{
            username:'',
            password:''
        }
    //     return await this.userService.findUser(user.id);
    }
}