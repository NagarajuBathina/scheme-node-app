import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { Users } from './users/users.model';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: '82.25.121.32',
      port: 3306,
      username: 'u276789778_monthly_scheme',
      password: '123@Apple@123',
      database: 'u276789778_monthly_scheme',
      autoLoadModels: true,
      synchronize: true,
      models: [Users],
      logging: false,
    }),

    // rate limiting
    ThrottlerModule.forRoot([
      {
        ttl: 60000, // 60 seconds
        limit: 10, // max 10 requests/minute
      },
    ]),

    UsersModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
