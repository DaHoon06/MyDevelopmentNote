import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { UserDB, UserDocument } from "../DB/schemas/user/user.schema";
import { Model } from "mongoose";
import { UserInfoDto } from "./dto/user.info.dto";
import * as crypto from 'crypto';

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

    async validateCheck(id){
        return await this.userModel.findOne({email: id}).exec();
    }


    async join(userInfo: UserInfoDto): Promise<UserDB>{
        let { password } = userInfo
        userInfo.password =
            crypto.createHash('sha512').update(password).digest('hex').toString();

        const insertUser = new this.userModel(userInfo);
        return insertUser.save();
    }
}
