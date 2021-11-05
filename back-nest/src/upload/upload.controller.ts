import {Controller, Post} from "@nestjs/common";

@Controller('/fileUpload')
export class UploadController{

    @Post()
    async uploadFile(){
        console.log('upload');
    }

}