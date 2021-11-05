import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {CommentDB, CommentSchema} from "../DB/schemas/board/comment.schema";
import {CommentController} from "./comment.controller";
import {CommentService} from "./comment.service";

@Module({
    imports:[
        MongooseModule.forFeature([{name: CommentDB.name, schema: CommentSchema}])
    ],
    controllers: [CommentController],
    providers: [CommentService],
})
export class CommentModule {}