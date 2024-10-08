import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

import { Funds } from '../entity/funds.entity';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  @Inject(ConfigService)
  private readonly config: ConfigService;

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      url: this.config.get('FUNDS_QUERY_DB_URL'),
      entities: [Funds],
      migrations: ['dist/migrations/*.js'],
      migrationsTableName: 'typeorm_migrations',
      migrationsRun: true,
      synchronize: true,
      logging: false,
    };
  }
}
