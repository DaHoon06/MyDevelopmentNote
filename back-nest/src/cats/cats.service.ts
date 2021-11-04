import {Injectable} from "@nestjs/common";
import {Cat} from './interfaces/cat.interface'

@Injectable() // Nest IoC 컨테이너에서 관리할 수 있는 클래스임을 선언하는 메타데이터를 첨부
export class CatsService {
    private readonly cats: Cat[] = [];

    create(cat: Cat){
        this.cats.push(cat);
    }

    findAll(): Cat[]{
        return this.cats;
    }
    findOne(id: string){
        return this.cats;
    }

    findAllContents({activeOnly: boolean, page: number}){
        return this.cats;
    }
}