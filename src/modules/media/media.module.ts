import { Module } from '@nestjs/common';
import { MediaController } from './media.controller';
import { SqlMediaDao } from './sql-media.dao';
import { MediaService } from './media.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.register({
      dest: './media',
    }),
  ],
  controllers: [MediaController],
  providers: [
    {
      provide: 'MediaDao',
      useClass: SqlMediaDao,
    },
    MediaService,
  ],
  exports: [MediaService],
})
export class MediaModule {}
