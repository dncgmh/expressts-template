import { IsAlphanumeric, IsEmail, IsString, Length } from 'class-validator';

export class LoginUserDto {
  @IsString()
  @IsEmail()
  email: string;
  @Length(6, 24)
  @IsString()
  password: string;
}

export class RegisterUserDto {
  @IsString()
  @IsAlphanumeric()
  @Length(6, 24)
  username: string;
  @IsString()
  @IsEmail()
  email: string;
  @Length(6, 24)
  @IsString()
  password: string;
}
