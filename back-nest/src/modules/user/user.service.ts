import {Injectable} from "@nestjs/common";

@Injectable()
export class userService {

    emailCheck(email){
        return {result: 0};
    }
}
