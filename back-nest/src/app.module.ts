import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { mongoConn } from './modules/DB/mongo.conn';
import { BoardModule } from './modules/board/board.module';
import { UploadModule } from "./upload/upload.module";
import { CommentModule } from "./modules/comment/comment.module";
import { UserModule } from "./modules/user/user.module";
import { AuthModule } from "./modules/auth/auth.module";
import { jwtTokenCheck } from "./jwt/jwt.token.check";

@Module({
  imports: [
      BoardModule,
      mongoConn,
      AuthModule,
      UploadModule,
      CommentModule,
      UserModule,
  ],
  controllers: [AppController,jwtTokenCheck],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
