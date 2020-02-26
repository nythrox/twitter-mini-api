import { CreateUserDto } from '../dtos/create-user.dto';
import { UserModel } from '../models/user.model';

export interface UsersDao {
  findUser(id: number): Promise<UserDto>;
  findAll(): Promise<UserDto[]>;
  create(createUserDto: CreateUserDto): Promise<number>;
  findByEmail(email: string): Promise<UserModel>;
}
