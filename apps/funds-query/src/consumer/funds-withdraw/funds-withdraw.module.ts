import { FundsRepository } from '@app/funds-query/common/repository/funds.repository';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FundsWithdrawnConsumer } from './consumer/funds-withdraw.consumer';
import { FundsWithdrawnHandler } from './event/funds-withdraw.handler';

@Module({
  imports: [
    CqrsModule,
    ClientsModule.register([{ name: 'KAFKA_SERVICE', transport: Transport.KAFKA }]),
    TypeOrmModule.forFeature([FundsRepository]),
  ],
  controllers: [FundsWithdrawnConsumer],
  providers: [FundsWithdrawnHandler],
})
export class FundsWithdrawnModule {}
