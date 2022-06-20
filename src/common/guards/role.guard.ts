import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (roles.length < 1) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    if (roles.includes(request.user.role)) {
      return true;
    }

    return false;
  }
}
