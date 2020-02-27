import { Injectable, Inject } from '@nestjs/common';
import { MediaDao } from './media-dao.interface';
import { MediaDto } from './dto/media.dto';

@Injectable()
export class MediaService {
  constructor(@Inject('MediaDao') private mediaDao: MediaDao) {}

  async saveImage(name: string): Promise<number> {
    const path = 'media/';
    return await this.mediaDao.saveImage(path + name);
  }
  async addImageToPost(imageId: number, postId: number): Promise<void> {
    return await this.mediaDao.addImageToPost(imageId, postId);
  }
  async findMediaFromPost(postId: number): Promise<MediaDto[]> {
    return this.mediaDao.findMediaFromPost(postId);
  }
}
