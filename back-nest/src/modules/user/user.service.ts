import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { UserDB, UserDocument } from "../DB/schemas/user/user.schema";
import { Model } from "mongoose";
import { UserInfoDto } from "./dto/user.info.dto";

@Injectable()
export class userService {
    constructor(
        @InjectModel(UserDB.name)
        private userModel: Model<UserDocument>
    ) {}

    async emailCheck(email){
        const data = await this.userModel.findOne({email: email.email}).exec();
        console.log(data,'DATA CHECK ::::::');
        if(!data){return {msg: 'ok'}}
        return {result:!!data};

    }

    async login(){
        return '';
    }

    async findOne(id){
        return await this.userModel.findOne({id: id}).exec();
    }

    async findUser(id) {
        return 'test_findUser';
    }

    async join(userInfo: UserInfoDto): Promise<UserDB>{
        console.log('서비스 안 ',userInfo)
        const insertUser = new this.userModel(userInfo);
        return insertUser.save();
    }
}
