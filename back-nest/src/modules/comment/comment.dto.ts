import {IsString} from "class-validator";

export class CommentDTO {
    @IsString()
    b_id: string;

    @IsString()
    c_content: string;

    @IsString()
    c_writer: string;

    created_at: Date;
    updated_at: Date;
}