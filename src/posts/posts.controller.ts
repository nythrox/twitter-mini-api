import {
  Controller,
  Post,
  Req,
  Get,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { AuthRoles } from 'src/auth/decorators/auth-roles.decorator';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dtos/add-post.dto';
import { PostsFacade } from './posts.facade';
import { PostDto } from './dtos/post.dto';

@Controller('posts')
export class PostsController {
  constructor(
    private postsService: PostsService,
    private postsFacade: PostsFacade,
  ) {}

  @Get()
  async findAll() {
    return this.postsService.findAllPosts();
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<PostDto> {
    return this.postsFacade.findPost(id);
  }

  @AuthRoles('USER')
  @Put(':id/like')
  async likePost(@Param('id') id: number, @Req() req): Promise<void> {
    return this.postsService.likePost(req.user.user.id, id);
  }

  @AuthRoles('USER')
  @Post()
  async createPost(@Body() createPostDto: CreatePostDto, @Req() req) {
    console.log('AAAAA');
    return this.postsFacade.createPost(req.user.user.id, createPostDto);
  }
}
