import { ApiProperty } from '@nestjs/swagger';
export class UserDto {
  @ApiProperty()
  public name: string
  @ApiProperty()
  public handle: string
  @ApiProperty()
  public id: number
}
