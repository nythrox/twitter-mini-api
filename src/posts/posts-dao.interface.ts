import { PostModel } from './models/post.model';

export interface PostsDao {
  likePost(userId: number, postId: number): Promise<void>;
  findPostsFromUser(userId: number): Promise<PostModel[]>;
  findPosts(): Promise<PostModel[]>;
  createPost(userId: number, text: string): Promise<number>;
}
