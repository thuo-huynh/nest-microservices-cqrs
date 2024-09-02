import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './common/services/typeorm.service';
import { ConsumerModule } from './consumer/consumer.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: process.env.IS_DOCKER ? '.docker.env' : '.env' }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    CqrsModule,
    ConsumerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
