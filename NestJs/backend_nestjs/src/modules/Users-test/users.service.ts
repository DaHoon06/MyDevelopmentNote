import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./schemas/user.schema";
import { Model } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>
  ) {  }

  async getById(userData: CreateUserDto){
    const user = await this.userModel.findOne({"id": userData.id});
    if(user){
      if(user.pw === userData.pw){
        return user;
      }
      throw new HttpException(
        '비밀번호를 확인하세요.',
        HttpStatus.NOT_FOUND,
      )
    }
    throw new HttpException(
      '사용자 아이디가 존재하지 않습니다.',
       HttpStatus.NOT_FOUND,
    );
  }

  async signup(userData: CreateUserDto){
    return await this.userModel.create({...userData});
  }
}
