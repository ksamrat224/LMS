import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './no-spec/users/users.module';
import { UsersModule } from './users/users.module';
import { MembersModule } from './members/members.module';
import { BooksModule } from './books/books.module';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [UsersModule, MembersModule, BooksModule, TransactionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
