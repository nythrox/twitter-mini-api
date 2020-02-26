import { Injectable, Inject } from '@nestjs/common';
import { PostsDao } from './posts-dao.interface';

@Injectable()
export class PostsService {
  constructor(@Inject('PostsDao') private postsDao: PostsDao) {}
  async createPost(userId: number, text: string): Promise<number> {
    return this.postsDao.createPost(userId, text);
  }
  async likePost(userId: number, postId: number): Promise<void> {
    return this.postsDao.likePost(userId, postId);
  }
  async findAllPosts() {
    return this.postsDao.findPosts();
  }
  async findPostsByUserId(userId: number) {
    return this.postsDao.findPostsFromUser(userId);
  }
  async findPost(id: number) {
    return this.postsDao.findPost(id);
  }
  async findPostsLikes(id: number) {
    return this.postsDao.findPostsLikes(id);
  }
}
