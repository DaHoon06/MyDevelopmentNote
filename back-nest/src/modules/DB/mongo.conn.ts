import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

console.log('DB CONNECTED!!!');

export const mongoConn = MongooseModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: () => ({
    uri: process.env.MONGO_URI || 'mongodb://localhost:27017/test2',
  }),
  inject: [ConfigService],
});
