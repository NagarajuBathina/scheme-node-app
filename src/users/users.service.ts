import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { AppError } from 'src/common/errors/app.error';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

const JWT_TOKEN = 'schemes.2025.secretkey';

@Injectable()
export class UsersService {
  constructor(@InjectModel(Users) private usersModel: typeof Users) {}

  // create user
  async createUser(dto: CreateUserDto) {
    const checkPhone = await this.usersModel.findOne({
      where: { phone: dto.phone },
    });
    if (checkPhone) throw new AppError('Phone number already existed', 400);

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(dto.password, salt);

    const userData = { ...dto, password: hash };

    const newUser = await this.usersModel.create(userData);

    // Convert to plain object
    const plainUser = newUser.get({ plain: true });

    delete plainUser.password;

    return {
      success: true,
      message: 'User created successfully',
      user: plainUser,
    };
  }

  // login users
  async loginUser(phone: string, password: string) {
    const user = await this.usersModel.findOne({
      where: { phone, status: true },
      raw: true,
    });

    if (!user) throw new AppError('User not found', 404);

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) throw new AppError('Invalid password', 400);

    const payload = {
      user_id: user.user_id,
    };

    const token = jwt.sign(payload, JWT_TOKEN, { expiresIn: '1d' });

    return {
      success: true,
      token,
      user,
    };
  }

  // fetch all users
  async getAllUsers(page: number, limit: number) {
    const offset = (page - 1) * limit;
    const { rows, count } = await this.usersModel.findAndCountAll({
      offset,
      limit,
      order: [['created_at', 'DESC']],
    });

    return {
      success: true,
      currentPage: page,
      totalUsers: count,
      totalPages: Math.ceil(count / limit),
      data: rows,
    };
  }

  // fetch user by id
  async fetchUserById(userid: number) {
    const user = await this.usersModel.findByPk(userid, {
      attributes: { exclude: ['password'] },
    });
    if (!user) throw new AppError('User not found', 404);
    return user;
  }
}
