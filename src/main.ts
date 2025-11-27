import { ValidationPipe, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove extra props
      transform: true, // convert to DTO types
      forbidNonWhitelisted: false,
    }),
  );
  // register filter
  app.useGlobalFilters(new GlobalExceptionFilter());

  const port = process.env.PORT || 1540;
  await app.listen(port);
  Logger.log(`Server listening on http://localhost:${port}`, 'Bootstrap');
}
bootstrap();
