import { KNEX_CONNECTION, KnexService } from '@nestjsplus/knex';
import {
  Injectable,
  Inject,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { UsersDao } from '../interfaces/users-dao.interface';
import { SqlService } from 'src/sql/sql.service';
import { Connection, OkPacket, RowDataPacket } from 'mysql2/promise';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserModel } from '../models/user.model';
@Injectable()
export class SqlUsersDao implements UsersDao {
  constructor(private sqlService: SqlService) {
    this.db = sqlService.getDb().promise();
  }

  private db: Connection;
  async findUser(id: number): Promise<UserDto> {
    const sql = this.db.format(
      'SELECT name, handle, id FROM User WHERE id = ?',
      [id],
    );
    const [res, fields] = await this.db.query<RowDataPacket[]>(sql);
    try {
      return {
        id: res[0].id,
        name: res[0].name,
        handle: res[0].handle,
      };
    } catch (e) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }
  }

  async findByEmail(email: string): Promise<UserModel> {
    const sql = this.db.format('SELECT * FROM User WHERE email = ?', [email]);
    try {
      const [res, fields] = await this.db.query<RowDataPacket[]>(sql);
      return await {
        id: res[0].id,
        name: res[0].name,
        email: res[0].email,
        handle: res[0].handle,
        password: res[0].password,
      };
    } catch (e) {
      throw new BadRequestException('Username or password incorrect.');
    }
  }

  async findAll(): Promise<UserDto[]> {
    const sql = this.db.format('SELECT name, handle, id FROM User');
    const [rows, fields] = await this.db.query<RowDataPacket[]>(sql);
    return rows.map(user => ({
      handle: user.handle,
      name: user.name,
      id: user.id,
    }));
  }

  async create(createUserDto: CreateUserDto): Promise<number> {
    const sql = this.db.format(
      'INSERT INTO User (name, handle, email, password) VALUES (?, ?, ?, ?)',
      [
        createUserDto.name,
        createUserDto.handle,
        createUserDto.email,
        createUserDto.password,
      ],
    );
    try {
      const [res] = await this.db.query<OkPacket>(sql);
      return res.insertId;
    } catch (e) {
      console.log(e);
      const message = e.message as string;
      if (message.includes('handle')) {
        throw new BadRequestException('Handle already exists.');
      } else if (message.includes('email')) {
        throw new BadRequestException('Email already exists.');
      }
    }
  }
}
