import { Injectable, BadRequestException } from '@nestjs/common';
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

  async createPost(userId: number, text: string): Promise<number> {
    const sql = this.db.format(
      'INSERT INTO Post (userId, text) VALUES (?, ?)',
      [userId, text],
    );
    console.log(sql)
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
}
