import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KnexModule } from '@nestjsplus/knex';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import { PostsModule } from '../posts/posts.module';
import { MediaModule } from '../media/media.module';
import { SqlModule } from '../sql/sql.module';

@Module({
  imports: [
    SqlModule.register({
      host: '127.0.0.1',
      user: 'root',
      port: 3306,
      password: 'P08514jwngba',
      database: 'mini_twitter',
    }),
    AuthModule,
    UsersModule,
    PostsModule,
    MediaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
