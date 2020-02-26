import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dtos/add-post.dto';
import { PostsService } from './posts.service';
import { create } from 'domain';
import { PostDto } from './dtos/post.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PostsFacade {
  constructor(
    private postsService: PostsService,
    private usersService: UsersService,
  ) {}
  async createPost(userId: number, createPostDto: CreatePostDto) {
    const postId = this.postsService.createPost(userId, createPostDto.text);
    // this.mediaService.createImages("asdasd","asdasd")
    return postId;
  }
  async findPost(postId: number): Promise<PostDto> {
    const post = await this.postsService.findPost(postId);
    const author = await this.usersService.findUser(post.userId);
    const likes = await this.postsService.findPostsLikes(postId);
    return {
      text: post.text,
      author,
      images: [],
      replies: [],
      likes,
    };
  }
}
