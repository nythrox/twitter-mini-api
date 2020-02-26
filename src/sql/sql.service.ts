import { Injectable, Inject } from '@nestjs/common';
import { SqlModuleOptions } from './sql.module';
import { createConnection, Connection } from 'mysql2';
@Injectable()
export class SqlService {
  private mySqlConnection: Connection;

  constructor(private options: SqlModuleOptions) {}

  getDb(): Connection {
    if (!this.mySqlConnection) {
      this.mySqlConnection = createConnection(this.options);
    }
    return this.mySqlConnection;
  }
}
