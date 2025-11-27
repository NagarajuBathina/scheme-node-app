import { IsNotEmpty, MinLength, IsPhoneNumber } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsPhoneNumber()
  phone: string;

  @MinLength(6)
  password: string;

  @IsNotEmpty()
  address_line1: string;
}
