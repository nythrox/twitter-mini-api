import { IsNotEmpty, Length, IsArray } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
export class CreatePostDto {
  @ApiProperty()
  @IsNotEmpty()
  @Length(1, 140)
  text: string;
  @ApiProperty()
  @IsArray()
  images: number[];
}
