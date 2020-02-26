import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { PostDto } from 'src/modules/posts/dtos/post.dto';
import { PostsFacade } from '../posts/posts.facade';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService, private postsFacade: PostsFacade) {}

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }
  @Get(':id')
  async findUser(@Param('id') id: number) {
    return await this.usersService.findUser(id);
  }
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.createUser(createUserDto);
  }

  @Get(':id/posts')
  async findUsersPosts(@Param('id') id: number): Promise<PostDto[]> {
    return this.postsFacade.findPostsByUserId(id);
  }
}
