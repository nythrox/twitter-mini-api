import { Injectable, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { MediaDao } from './media-dao.interface';
import { SqlService } from '../sql/sql.service';
import { Connection, OkPacket, RowDataPacket } from 'mysql2/promise';
import { MediaDto } from './dto/media.dto';

@Injectable()
export class SqlMediaDao implements MediaDao {
  constructor(private sqlService: SqlService) {
    this.db = sqlService.getDb().promise();
  }

  private db: Connection;
  async saveImage(path: string): Promise<number> {
    const sql = this.db.format('INSERT INTO `Image` (url) VALUES (?)', [path]);
    try {
      const [res] = await this.db.query<OkPacket>(sql);
      return res.insertId;
    } catch (e) {
      console.log(e);
      const message = e.message as string;
      if (message.includes('postId')) {
        throw new BadRequestException('Post doesnt exist.');
      }
      throw e;
    }
  }
  async addImageToPost(imageId: number, postId: number): Promise<void> {
    try {
      const sql = this.db.format('UPDATE `Image` SET postId = ? WHERE id = ?', [
        postId,
        imageId,
      ]);
      const [res] = await this.db.query<OkPacket>(sql);
    } catch (e) {
      console.log(e);
      const message = e.message as string;
      if (message.includes('postId')) {
        throw new BadRequestException('Post doesnt exist.');
      }
      throw e;
    }
  }

  async findMediaFromPost(postId: number): Promise<MediaDto[]> {
    const sql = this.db.format('SELECT * FROM Image WHERE postId = ?', [
      postId,
    ]);
    const [res, fields] = await this.db.query<RowDataPacket[]>(sql);
    try {
      return res.map(image => {
        return {
          url: image.url,
          id: image.id,
        }
      });
    } catch (e) {
      throw new HttpException('No post found', HttpStatus.NOT_FOUND);
    }
  }
}
