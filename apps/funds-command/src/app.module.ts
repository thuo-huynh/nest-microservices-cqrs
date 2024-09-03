import { ReceiveFundsCommand } from '@app/common/commands';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventSourcingModule } from 'nestjs-event-sourcing';
import { DepositFundsModule } from './deposit-funds/deposit-funds.module';
import { WithdrawFundsModule } from './withdraw-funds/withdraw-funds.module';
import { ReceiveFundsModule } from './receive-funds/receive-funds.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: process.env.IS_DOCKER ? '.docker.env' : '.env' }),
    EventSourcingModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        mongoUrl: config.get('FUNDS_COMMAND_DB_URL'),
      }),
      inject: [ConfigService],
    }),
    DepositFundsModule,
    WithdrawFundsModule,
    ReceiveFundsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
