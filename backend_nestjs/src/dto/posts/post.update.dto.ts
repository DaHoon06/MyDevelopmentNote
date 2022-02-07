import { PartialType } from '@nestjs/mapped-types';
import { PostDto } from '../../dto';

export class PostUpdateDto extends PartialType(PostDto){}