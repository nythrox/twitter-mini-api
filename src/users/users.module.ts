import { Module } from '@nestjs/common';
import { KnexModule } from '@nestjsplus/knex';
import { UsersService } from './users.service';
import { SqlUsersDao } from './daos/sql-users.dao';
import { UsersController } from './users.controller';
import { UsersDao } from './interfaces/users-dao.interface';

@Module({
  imports: [],
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
