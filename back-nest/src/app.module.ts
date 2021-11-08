import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { mongoConn } from './modules/DB/mongo.conn';
import { BoardModule } from './modules/board/board.module';
import {UploadModule} from "./upload/upload.module";
import {CommentModule} from "./modules/comment/comment.module";
import {UserModule} from "./modules/user/user.module";

@Module({
  imports: [BoardModule, mongoConn ,UploadModule,CommentModule,UserModule],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {
  /*configure(consumer: MiddlewareConsumer): any {
    consumer
        .apply(LoggerMiddleware)
        .exclude( // 특정 Route를 제외 시킴
            {path: 'cats', method: RequestMethod.GET},
            'cats/(.*)',
        )
        .forRoutes(CatsController);
  }*/
}
