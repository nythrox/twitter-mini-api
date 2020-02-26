import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KnexModule } from '@nestjsplus/knex';

@Module({
  imports: [
    KnexModule.register({
      client: 'mysql',
      debug: true,
      connection: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'mini-twitter',
        port: 5432,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
