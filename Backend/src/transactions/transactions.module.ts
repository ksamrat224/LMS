import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [TransactionsController],
  providers: [TransactionsService, PrismaClient],
})
export class TransactionsModule {}
