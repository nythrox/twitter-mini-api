import { Injectable, Inject } from '@nestjs/common';
import { UsersDao } from './interfaces/users-dao.interface';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserModel } from './models/user.model';
import { UserDto } from './dtos/user.dto';

@Injectable()
export class UsersService {
  constructor(@Inject('UsersDao') private usersDao: UsersDao) {}

  async findUser(id: number): Promise<UserDto> {
    return this.usersDao.findUser(id);
  }
  async findAll(): Promise<UserDto[]> {
    return this.usersDao.findAll();
  }

  async createUser(createUserDto: CreateUserDto): Promise<number> {
    return await this.usersDao.create(createUserDto);
  }

  async findByEmail(email: string): Promise<UserModel> {
    return this.usersDao.findByEmail(email);
  }
}
