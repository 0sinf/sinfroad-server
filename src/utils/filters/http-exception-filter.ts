import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const res = ctx.getResponse<Response>();

    const response = (exception as HttpException).getResponse();

    if (!(exception instanceof HttpException)) {
      exception = new InternalServerErrorException();
    }

    this.logger.error(response);

    res.status((exception as HttpException).getStatus()).json(response);
  }
}
