import { IsEmail, IsString, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsOptional()
  @IsString()
  public password?: string;
  
  @IsOptional()
  @IsString()
  public name?: string;

  @IsOptional()
  @IsString()
  public picture?: string;

  @IsOptional()
  @IsString()
  public sub?: string;
}
