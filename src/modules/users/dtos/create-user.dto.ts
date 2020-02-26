import { IsNotEmpty, Length, IsEmail } from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty()
  @Length(3, 45)
  public name: string;
  @IsNotEmpty()
  @Length(3, 30)
  public handle: string;
  @IsNotEmpty()
  @IsEmail()
  public email: string;
  @Length(5)
  @IsNotEmpty()
  public password: string;
}
