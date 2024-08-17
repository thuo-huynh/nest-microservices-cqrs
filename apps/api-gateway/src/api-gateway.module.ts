import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';
import { AccountModule } from './account/account.module';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';

@Module({
  imports: [
    AccountModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: process.env.IS_DOCKER ? '.docker.env' : '.env' }),
  ],
  controllers: [ApiGatewayController],
  providers: [ApiGatewayService],
})
export class ApiGatewayModule { }
