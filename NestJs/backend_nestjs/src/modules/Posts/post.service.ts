import { Injectable } from "@nestjs/common";
import {IPost} from "../../interfaces/Posts/IPost";

@Injectable()
export class PostService {

    async findByAll(): Promise<IPost> {
        const data = {
            title: 'TEST',
            content: 'TEST',
        }
        return data;
    }

    async savePosts(postData: IPost) {
        return {
            result: true
        }
    }

}