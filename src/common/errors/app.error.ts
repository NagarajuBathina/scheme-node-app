import { HttpException, HttpStatus } from '@nestjs/common';

export class AppError extends HttpException {
  public readonly isOperational: boolean;

  constructor(message: string, statusCode = HttpStatus.INTERNAL_SERVER_ERROR, isOperational = true) {
    super(message, statusCode);
    this.isOperational = isOperational;
  }
}
