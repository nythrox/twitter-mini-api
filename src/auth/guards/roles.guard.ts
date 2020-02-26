import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Inject,
  Optional,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    @Optional() @Inject('Reflector') private readonly reflector: Reflector,
    @Inject('JwtService') private readonly jwtService: JwtService,
  ) {
    // this.reflector = new Reflector();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    this.validateToken(context);
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    this.validateUser(user);
    const godRole = 'ADMIN';
    const routeRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );
    if (!routeRoles) {
      return true;
    }

    const isAdmin = () => user.roles.includes(godRole);
    const hasRole = () => user.roles.some(role => routeRoles.includes(role));

    if (user && user.roles) {
      if (hasRole() || isAdmin()) {
        return true;
      }
    }
    throw new UnauthorizedException();
  }

  validateToken(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    let jwt;
    try {
      jwt = request.headers.authorization.replace(/^Bearer\s/, '');
    } catch (e) {
      throw new UnauthorizedException('Missing bearer token.');
    }
    let payload;
    try {
      payload = this.jwtService.verify(jwt);
    } catch (e) {
      throw new UnauthorizedException('Invalid jwt.');
    }
    if (!payload.user) {
      throw new UnauthorizedException('Missing user in jwt payload.');
    }
    request.user = payload.user;
    console.log(payload)
  }

  validateUser(user) {
    if (!user.roles) {
      throw new UnauthorizedException('Missing user roles in jwt payload.');
    }
  }
}
