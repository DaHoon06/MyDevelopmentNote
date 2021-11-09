import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {ENV} from "../../config/env.config";

console.log('DB CONNECTED!!!');

export const mongoConn = MongooseModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: () => ({
    uri: ENV.MongoDB_URI || 'mongodb://localhost:27017/test2',
  }),
  inject: [ConfigService],
});
