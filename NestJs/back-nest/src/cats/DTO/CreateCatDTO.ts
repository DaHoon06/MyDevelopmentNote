/*
* DTO를 통하여 Schema 결정
* TypeScript를 사용하거나 간단한 클래스를 사용하여 DTO Schemamf 확인할 수 있다.
* */

import {IsInt, IsString} from "class-validator";    // 유효성 체크

export class CreateCatDTO {

    @IsString()
    name: string;

    @IsInt()
    age: number;

    @IsString()
    breed: string;
}

// CatsController 내부에 생성한 DTO를 사용한다고 등록해준다.
