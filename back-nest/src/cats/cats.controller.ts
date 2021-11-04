import {
    Body,
    Controller, DefaultValuePipe,
    Delete,
    ForbiddenException,
    Get,
    HttpStatus,
    Param, ParseBoolPipe,
    ParseIntPipe,
    Post,
    Put, Query, SetMetadata,
    UseFilters
} from "@nestjs/common";

import {CreateCatDTO} from "./DTO/CreateCatDTO";
import {UpdateCatDto} from "./DTO/UpdateCatDto";
import {CatsService} from "./cats.service";
import {Cat} from "./interfaces/cat.interface";
import {HttpExceptionFilter} from "./etc_tutorial/exception-handling/http-exception-filter";
import {ROLE} from "./etc_tutorial/create-roles/roles.decorator";

@Controller('cats')
//@UseFilters(new HttpExceptionFilter())  CatsController 전역에 예외 처리
export class CatsController {

    constructor(private catsService: CatsService) {
    }

    @Post()
    // @SetMetadata('roles',['admin']) // 이와 같이 직접 선언 하는것보다 ROLE을 커스텀 해서 사용하는것이 안전
    @ROLE('admin') // 내가 커스텀 한 ROLE
    //@UseFilters(new HttpExceptionFilter()) // @Catch() 데코레이터와 유사하게 사용가능
    @UseFilters(HttpExceptionFilter) // 인스턴스 대신 클래스를 필터에 적용하는것이 메모리 효율에서 좋음
    async create(@Body() createCatDTO: CreateCatDTO){
        // req.body -> @Body() @Body() "할당하고 싶은 변수명:
        //this.catsService.create(createCatDTO) // res.json 으로 하지 않아도 json 형태로 return

        this.catsService.create(createCatDTO);

        throw new ForbiddenException();
    }
    @Get()
    async findAll(): Promise<Cat[]>{
        // @Query("쿼리 이름") "원하는 이름"  ->  쿼리스트링
        return this.catsService.findAll();
    }

    // @Res를 사용하여 이와 같이 변경
    /*@Post()
    create(@Res() res: Response){
        res.status(HttpStatus.CREATED).send();
    }
    @Get()
    findAll(@Res() res: Response){
        res.status(HttpStatus.OK).json([]);
    }*/

    @Get(':id')
    //async findOne(@Param('id', ParseIntPipe) id: string) {
    async findOne(@Param('id', new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE //예외는 findOne() 메서드의 본문이 실행되지 않도록
    })) id: string) {
        // req.params -> @Param 으로 바뀜 @Param("이름") "원하는 이름"
        return this.catsService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
        return `This action updates a #${id} cat`;
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return `This action removes a #${id} cat`;
    }

    @Get()
    async findAllContents(
        @Query('activeOnly', new DefaultValuePipe(false), ParseBoolPipe) activeOnly: boolean,
        @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number,
    ) {
        return this.catsService.findAllContents({ activeOnly, page });
    }
}