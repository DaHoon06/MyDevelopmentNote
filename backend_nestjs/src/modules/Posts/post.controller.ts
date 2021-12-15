import {
    Body,
    Controller,
    DefaultValuePipe,
    Get, InternalServerErrorException,
    Param,
    ParseIntPipe,
    Post,
    Query,
    UseInterceptors
} from "@nestjs/common";
import { PostService } from "./post.service";
import { ValidationPipe } from "../../custom/pipe/validation.pipe";
import { PostDto } from "../../dto/post.dto";
import { ErrorInterceptor } from "../../custom/interceptor/ErrorInterceptor";
import {User} from "../../custom/decorator/User/User";


interface User {
    name: string;
    email: string;
}


@Controller('posts')
export class PostController {
    constructor(
        private readonly postService: PostService,
    ) {
    }


    @Get()
    async findByAll(
        @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    ) {
        return await this.postService.findByAll();
    }

    @Get('/user')
    getUser(@User(new ValidationPipe()) user: User) {
        console.log(user)
    }

    @UseInterceptors(ErrorInterceptor)
    @Get(':id')
    findOne(@Param('id') id: string){
        throw new InternalServerErrorException();
    }



    @Post()
    async savePosts(@Body(ValidationPipe) postDto: PostDto) {
        return await this.postService.savePosts(postDto);
    }
}