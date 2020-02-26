import { Module, DynamicModule, Provider, Type, Global } from '@nestjs/common';
import * as mysql from 'mysql2/promise';
import { SqlService } from './sql.service';

@Global()
@Module({})
export class SqlModule {
  public static register(connectionOptions: SqlModuleOptions): DynamicModule {
    return {
      module: SqlModule,
      providers: [
        SqlService,
        {
          provide: SqlService,
          useValue: new SqlService(connectionOptions),
        },
      ],
      exports: [SqlService],
    };
  }

  public static registerAsync(
    connectOptions: SqlModuleAsyncOptions,
  ): DynamicModule {
    return {
      module: SqlModule,
      providers: [SqlService, ...this.createConnectProviders(connectOptions)],
      exports: [SqlService],
    };
  }

  private static createConnectProviders(
    options: SqlModuleAsyncOptions,
  ): Provider[] {
    return [
      {
        provide: 'CONNECTION_SQL_CONNECTION_OPTIONS',
        useFactory: async (optionsFactory: SqlModuleOptionsFactory) =>
          await optionsFactory.createMassiveConnectOptions(),
        inject: [options.useClass],
      },
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ];
  }
}

export interface SqlModuleOptions extends mysql.ConnectionOptions {}

export interface SqlModuleOptionsFactory {
  createMassiveConnectOptions(): Promise<SqlModuleOptions> | SqlModuleOptions;
}

export interface SqlModuleAsyncOptions {
  useExisting?: Type<SqlModuleOptionsFactory>;
  useClass?: Type<SqlModuleOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<SqlModuleOptions> | SqlModuleOptions;
  inject?: any[];
}
