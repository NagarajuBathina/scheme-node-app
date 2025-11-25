import { IsEmail, IsEnum, IsNotEmpty, IsNumber, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNumber()
  branch_id: number;

  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  @IsEnum(['admin', 'branch', 'cashier'])
  role: string;
}
