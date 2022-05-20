import { PartialType } from '@nestjs/mapped-types';
import { PostDto } from '../index';

export class PostUpdateDto extends PartialType(PostDto){}