import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [BooksController],
  providers: [BooksService, PrismaClient],
})
export class BooksModule {}
