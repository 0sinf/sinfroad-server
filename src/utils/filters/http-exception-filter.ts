import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const res = ctx.getResponse<Response>();

    const response = (exception as HttpException).getResponse();

    if (!(exception instanceof HttpException)) {
      exception = new InternalServerErrorException();
    }

    res.status((exception as HttpException).getStatus()).json(response);
  }
}
