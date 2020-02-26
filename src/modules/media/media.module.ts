import { Module } from '@nestjs/common';
import { MediaController } from './media.controller';
import { MediaDao } from './media.dao';
import { MediaService } from './media.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
    imports: [MulterModule.register({
        dest: '/media'
    })],
    controllers: [MediaController],
    providers: [MediaDao, MediaService]
})
export class MediaModule {}
