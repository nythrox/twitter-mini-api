import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from 'src/modules/users/dtos/user.dto';
import { MediaDto } from 'src/modules/media/dto/media.dto';
export class PostDto {
  @ApiProperty()
  public author: 
  UserDto;
  @ApiProperty()
  public text: string;
  @ApiProperty()
  public images: MediaDto[];
  @ApiProperty()
  public replies: PostDto[];
  @ApiProperty()
  public likes: number;
}
