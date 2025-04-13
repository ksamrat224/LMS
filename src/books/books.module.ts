import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { PrismaClient } from '@prisma/client';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Module({
  controllers: [BooksController],
  providers: [BooksService, PrismaClient, CloudinaryService],
})
export class BooksModule {}
