import {
  Injectable,
  UnauthorizedException,
  HttpException,
  HttpStatus,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccessTokenPayload } from './jwt-payload.interface';
import { RefreshDto } from './dto/refresh.dto';
import { RefreshToken } from './models/refresh-token.model';
import { RefreshTokenPayload } from './models/refresh-token-payload.model';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { UserModel } from '../users/models/user.model';
import { UsersService } from '../users/users.service';
import { UserDto } from '../users/dtos/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly accessTokenJwtService: JwtService,
    private readonly refreshTokenJwtService: JwtService,
  ) {}

  async refresh(refreshDto: RefreshDto): Promise<any> {
    const refreshToken: RefreshToken = await this.validateRefreshToken(
      refreshDto.refreshToken,
    );
    const newAccessToken: string = this.generateNewAccessToken(
      refreshToken.sub,
      await this.userService.findUser(refreshToken.sub),
    );
    return {
      accessToken: newAccessToken,
    };
  }

  async login(loginDto: LoginDto): Promise<any> {
    const user: UserDto = await this.validateUser(
      loginDto.email,
      loginDto.password,
    );
    return {
      accessToken: this.generateNewAccessToken(user.id, {
        user,
      }),
      refreshToken: this.generateNewRefreshToken(user.id, {
        user,
      }),
      user,
    };
  }

  async register(regiserDto: CreateUserDto): Promise<any> {
    const userId: number = await this.userService.createUser(regiserDto);
    const user: UserDto = await this.userService.findUser(userId);
    return {
      accessToken: this.generateNewAccessToken(user.id, {
        user,
      }),
      refreshToken: this.generateNewRefreshToken(user.id, {
        user,
      }),
      user,
    };
  }


  async validateUser(email: string, pass: string): Promise<UserDto> {
    const user: UserModel = await this.userService.findByEmail(email);
    if (user && user.password === pass) {
      return user;
    } else {
      throw new HttpException(
        'Invalid username or password',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  generateNewAccessToken(sub: any, user: any): string {
    // tslint:disable-next-line: one-variable-per-declaration
    const roles = ['USER'];
    user.roles = roles;
    const payload = {
      sub,
      user,
    };
    const token: string = this.accessTokenJwtService.sign(payload);
    return token;
  }

  generateNewRefreshToken(sub: any, user: any): string {
    const payload: RefreshTokenPayload = {
      sub,
    };
    const token: string = this.refreshTokenJwtService.sign(payload);
    return token;
  }

  async validateRefreshToken(
    encodedRefreshToken: string,
  ): Promise<RefreshToken> {
    const refreshToken: RefreshToken = this.refreshTokenJwtService.verify<
      RefreshToken
    >(encodedRefreshToken, {
      ignoreExpiration: true,
    });
    if (!refreshToken) {
      throw new HttpException('Invalid refresh token', HttpStatus.UNAUTHORIZED);
    }
    return refreshToken;
  }
}
