import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/user-login.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create-user')
  createUser(@Body() dto: CreateUserDto) {
    return this.usersService.createUser(dto);
  }

  @Get('fetch-users')
  getAllUsers(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.usersService.getAllUsers(page, limit);
  }

  @Post('login-user')
  loginUser(@Body() dto: LoginUserDto) {
    return this.usersService.loginUser(dto.phone, dto.password);
  }

  @Get('fetch-user-byid/:id')
  fetchUserById(@Param('id') id: number) {
    return this.usersService.fetchUserById(id);
  }
}
