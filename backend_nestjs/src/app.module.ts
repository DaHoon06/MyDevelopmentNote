import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from "@nestjs/config";
import {UsersModule} from "./modules/Users/users.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./custom/decorator/User/User";
import {UserEntity} from "./db/repository/User/user.entity";


@Module({
  imports: [
      ConfigModule.forRoot({
          envFilePath: '.env',
          isGlobal: true,
      }),
      TypeOrmModule.forFeature(
          [UserEntity],

      ),
      //PostModule,
      //BatchModule,
      UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
