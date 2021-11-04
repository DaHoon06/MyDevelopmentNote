import { IsString } from 'class-validator';

export class boardDTO {
  //제목 내용 작성자 생성일 수정일 번호
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  writer: string;

  created_at: Date;
  updated_at: Date;
}
