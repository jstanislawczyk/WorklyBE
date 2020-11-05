import { IsEmail, IsInt, IsOptional, IsPositive, IsString, MaxLength, MinLength } from 'class-validator';

export class UserDto {

  @IsOptional()
  @IsInt()
  @IsPositive()
  public id?: number;

  @IsEmail()
  public email: string;

  @IsOptional()
  @IsString()
  @MaxLength(60)
  @MinLength(4)
  public password?: string;
}
