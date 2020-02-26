import { Controller, Post, Req, Get, Param, Body } from '@nestjs/common';
import { AuthRoles } from 'src/auth/decorators/auth-roles.decorator';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dtos/add-post.dto';
import { PostsFacade } from './posts.facade';

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
  async findById(@Param('id') id: number) {
    return this.postsService.findPostsByUserId(id);
  }

  @AuthRoles('USER')
  @Post()
  async createPost(@Body() createPostDto: CreatePostDto, @Req() req) {
    console.log("AAAAA");
    return this.postsFacade.createPost(req.user.user.id, createPostDto);
  }
}
