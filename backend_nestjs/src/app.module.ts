import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from "@nestjs/config";
import {UsersModule} from "./modules";

@Module({
  imports: [
      ConfigModule.forRoot({
          envFilePath: 'note',
          isGlobal: true,
      }),
      UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {

}
