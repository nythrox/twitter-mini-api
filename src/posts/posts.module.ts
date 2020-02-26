import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { SqlPostsDao } from './sql-posts.dao';
import { PostsFacade } from './posts.facade';
import { PostsController } from './posts.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [PostsController],
  providers: [
    {
      provide: 'PostsDao',
      useClass: SqlPostsDao,
    },
    PostsService,
    PostsFacade,
  ],
  exports: [PostsService, PostsFacade],
})
export class PostsModule {}
