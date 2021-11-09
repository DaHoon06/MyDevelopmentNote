import { Injectable } from "@nestjs/common";

@Injectable()
export class userService {

    async emailCheck(email){
        return {result: 0};
    }

    async login(){
        return '';
    }

    async findOne(username){
        return {
            id: 'test',
            password: 0,
        };
    }

    async findUser(id) {
        return 'test_findUser';
    }
}
