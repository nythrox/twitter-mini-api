import { IsEmail, IsNotEmpty, IsNumber, Length } from 'class-validator';
export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  public readonly email: string;

  @Length(4)
  public readonly password: string;
}
