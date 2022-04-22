import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./schemas/user.schema";
import { AuthsModule } from "../auths/auths.module";

@Module({
  imports:[
    MongooseModule.forFeature([
      { name: User.name, schema:UserSchema}
    ]),
    AuthsModule
  ],
  controllers: [UsersController],
  providers: [UsersService],

})
export class UsersModule {}
