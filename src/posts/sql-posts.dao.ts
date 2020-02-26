import {
  Injectable,
  BadRequestException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { SqlService } from 'src/sql/sql.service';
import { Connection, RowDataPacket, OkPacket } from 'mysql2/promise';
import { PostsDao } from './posts-dao.interface';
import { PostModel } from './models/post.model';
import { CreatePostDto } from './dtos/add-post.dto';

@Injectable()
export class SqlPostsDao implements PostsDao {
  constructor(private sqlService: SqlService) {
    this.db = sqlService.getDb().promise();
  }

  async findPost(id: number): Promise<PostModel> {
    const sql = this.db.format('SELECT * FROM Post WHERE id = ?', [id]);
    const [res, fields] = await this.db.query<RowDataPacket[]>(sql);
    try {
      return {
        id: res[0].id,
        text: res[0].text,
        userId: res[0].userId,
        replyingToPostId: res[0].replyingToPostId,
      };
    } catch (e) {
      throw new HttpException('No post found', HttpStatus.NOT_FOUND);
    }
  }

  async createPost(userId: number, text: string): Promise<number> {
    const sql = this.db.format(
      'INSERT INTO Post (userId, text) VALUES (?, ?)',
      [userId, text],
    );
    console.log(sql);
    try {
      const [res] = await this.db.query<OkPacket>(sql);
      return res.insertId;
    } catch (e) {
      console.log(e);
      const message = e.message as string;
      if (message.includes('userId')) {
        throw new BadRequestException("User doesn't exist.");
      }
      throw e;
    }
  }

  async findPostsFromUser(userId: number): Promise<PostModel[]> {
    const sql = this.db.format('SELECT * FROM Post WHERE userId = ?', [userId]);
    const [rows, fields] = await this.db.query<RowDataPacket[]>(sql);
    return rows.map(post => ({
      id: post.id,
      userId: post.userId,
      name: post.name,
      replyingToPostId: post.replyingToPostId,
      text: post.text,
    }));
  }

  async findPosts(): Promise<PostModel[]> {
    const sql = this.db.format('SELECT * FROM Post');
    const [rows, fields] = await this.db.query<RowDataPacket[]>(sql);
    return rows.map(post => ({
      id: post.id,
      name: post.name,
      userId: post.userId,
      replyingToPostId: post.replyingToPostId,
      text: post.text,
    }));
  }

  async likePost(userId: number, postId: number): Promise<void> {
    const sql = this.db.format(
      'INSERT INTO `Like` (userId, postId) VALUES (2,1)',
      [userId, postId],
    );
    const [res, fields] = await this.db.query<RowDataPacket[]>(sql);
  }
  private db: Connection;

  async findPostsLikes(id: number): Promise<number> {
    const sql = this.db.format('SELECT COUNT(*) FROM `Like` WHERE postId = ?', [
      id,
    ]);
    const [res, fields] = await this.db.query<RowDataPacket[]>(sql);
    console.log(res);
    try {
      return res[0]['COUNT(*)'];
    } catch (e) {
      throw new HttpException('No post found', HttpStatus.NOT_FOUND);
    }
  }
}
