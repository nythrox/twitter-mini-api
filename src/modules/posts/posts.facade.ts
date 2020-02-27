import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dtos/add-post.dto';
import { PostsService } from './posts.service';
import { create } from 'domain';
import { PostDto } from './dtos/post.dto';
import { UsersService } from '../users/users.service';
import { MediaService } from '../media/media.service';

@Injectable()
export class PostsFacade {
  constructor(
    private postsService: PostsService,
    private usersService: UsersService,
    private mediaService: MediaService,
  ) {}
  async createPost(userId: number, createPostDto: CreatePostDto) {
    console.log("h")
    const postId = await this.postsService.createPost(
      userId,
      createPostDto.text,
    );
    console.log(createPostDto)
    console.log("h")
    createPostDto.images.forEach(id => {
      this.mediaService.addImageToPost(id, postId);
    });
    console.log("oh")
    return postId;
  }
  async findPost(postId: number): Promise<PostDto> {
    const post = await this.postsService.findPost(postId);
    const author = await this.usersService.findUser(post.userId);
    const likes = await this.postsService.findPostsLikes(postId);
    const images = await this.mediaService.findMediaFromPost(postId)
    return {
      text: post.text,
      author,
      images,
      replies: [],
      likes,
    };
  }
  async findAllPosts(): Promise<PostDto[]> {
    const posts = await this.postsService.findAllPosts();
    return Promise.all(posts.map(async post => this.findPost(post.id)));
  }
  async findPostsByUserId(id: number): Promise<PostDto[]> {
    const posts = await this.postsService.findPostsByUserId(id);
    return Promise.all(posts.map(async post => this.findPost(post.id)));
  }
}
