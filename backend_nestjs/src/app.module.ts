import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./db/repository/User/user.entity";
import { ROUTES } from "./modules/module.router";
import { RouterModule } from "nest-router";

@Module({
  imports: [
      ConfigModule.forRoot({
          envFilePath: '.env',
          isGlobal: true,
      }),
      TypeOrmModule.forFeature(
          [UserEntity],
      ),
      RouterModule.forRoutes(ROUTES),

  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {

}
