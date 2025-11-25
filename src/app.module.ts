import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { Users } from './users/users.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: '82.25.121.32',
      port: 3306,
      username: 'u276789778_melon',
      password: '123@Apple@123',
      database: 'u276789778_melon',
      autoLoadModels: true,
      synchronize: true,
      models: [Users],
      logging: false,
    }),

    UsersModule,
  ],
})
export class AppModule {}
