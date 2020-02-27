import { IsNotEmpty, Length, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @Length(3, 45)
  public name: string;
  @ApiProperty()
  @IsNotEmpty()
  @Length(3, 30)
  public handle: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  public email: string;
  @ApiProperty()
  @Length(5)
  @IsNotEmpty()
  public password: string;
}
