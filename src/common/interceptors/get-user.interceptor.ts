import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { decode } from 'jsonwebtoken';

@Injectable()
export class GetUserInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest() as Request;

    const token = req.headers.authorization?.split('Bearer ')[1];

    if (token) {
      const { sub: userId } = decode(token);
      req.user = userId;
    }

    return next.handle();
  }
}
