import { Module, Provider, Global } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {
  JwtModule,
  JwtModuleAsyncOptions,
  JwtModuleOptions,
} from '@nestjs/jwt';
// import { ConfigService } from '../config/config.service';
// import { ConfigModule } from '../config/config.module';
import { UsersModule } from 'src/users/users.module';

// const accessTokenJwtConfigsFactory: JwtModuleAsyncOptions = {
//   imports: [ConfigModule],
//   useFactory: (configService: ConfigService): JwtModuleOptions => {
//     return {
//       secret: configService.accessTokenSecret,
//       signOptions: { expiresIn: configService.accessTokenExpiresIn },
//     };
//   },
//   inject: [ConfigService],
// };
// const refreshTokenJwtConfigsFactory: JwtModuleAsyncOptions = {
//   imports: [ConfigModule],
//   useFactory: (configService: ConfigService): JwtModuleOptions => {
//     return {
//       secret: configService.refreshTokenSecret,
//       signOptions: { expiresIn: configService.refreshTokenExpiresIn },
//     };
//   },
//   inject: [ConfigService],
// };

// const authTokenModule = JwtModule.registerAsync(accessTokenJwtConfigsFactory);
// const refreshTokenModuel = JwtModule.registerAsync(
//   refreshTokenJwtConfigsFactory,
// );
const authTokenModule = JwtModule.register({
  secret: 'refreshsecret',
  signOptions: { expiresIn: '1d' },
});
const refreshTokenModuel = JwtModule.register({
  secret: 'refreshsecret',
  signOptions: { expiresIn: '1000000y' },
});
@Global()
@Module({
  imports: [UsersModule, authTokenModule, refreshTokenModuel],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [authTokenModule, refreshTokenModuel],
})
export class AuthModule {}
