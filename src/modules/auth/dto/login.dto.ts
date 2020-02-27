import { IsEmail, IsNotEmpty, IsNumber, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  public readonly email: string;

  @ApiProperty()
  @Length(4)
  public readonly password: string;
}
