import { Module, forwardRef } from '@nestjs/common';
import { KnexModule } from '@nestjsplus/knex';
import { UsersService } from './users.service';
import { SqlUsersDao } from './daos/sql-users.dao';
import { UsersController } from './users.controller';
import { UsersDao } from './interfaces/users-dao.interface';
import { PostsModule } from '../posts/posts.module';

@Module({
  imports: [forwardRef(() => PostsModule)],
  controllers: [UsersController],
  providers: [
    {
      provide: 'UsersDao',
      useClass: SqlUsersDao,
    },
    UsersService,
  ],
  exports: [UsersService],
})
export class UsersModule {}
