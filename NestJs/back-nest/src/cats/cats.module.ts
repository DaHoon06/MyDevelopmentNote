import {Module} from "@nestjs/common";
import {CatsController} from "./cats.controller";
import {CatsService} from "./cats.service";

@Module({
    controllers: [CatsController],
    providers: [CatsService],
    exports: [CatsService], // 다른 모듈간의 CatsService를 공유하고 싶다면 exports
})

export class CatsModule {}
