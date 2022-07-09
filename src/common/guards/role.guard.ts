import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!this.hasRoles(roles)) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (this.canActive(roles, user.role)) {
      return true;
    }

    return false;
  }

  private hasRoles(roles: string[]) {
    return roles.length > 0;
  }

  private canActive(roles: string[], givenRole: string) {
    return roles.includes(givenRole);
  }
}
