import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MembersModule } from './members/members.module';
import { BooksModule } from './books/books.module';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [MembersModule, BooksModule, TransactionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
