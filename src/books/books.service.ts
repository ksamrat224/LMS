import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class BooksService {
  //dependency injection
  constructor(private readonly prisma: PrismaClient) {}

  async create(createBookDto: CreateBookDto) {
    return this.prisma.book.create({
      data: createBookDto,
    });
  }

  async findAll(user_id: number) {
    return this.prisma.book.findMany({
      where: {
        user_id,
      },
    });
  }

  async findOne(id: number, user_id: number) {
    const book = await this.prisma.book.findUnique({
      where: { id, user_id },
    });
    if (!book) {
      throw new NotFoundException('Book Not Found');
    }
    return book;
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    await this.findOne(id, updateBookDto.user_id as number);
    return this.prisma.book.update({
      where: { id, user_id: updateBookDto.user_id },
      data: updateBookDto,
    });
  }

  async remove(id: number, user_id: number) {
    await this.findOne(id, user_id);
    return this.prisma.book.delete({
      where: { id, user_id },
    });
  }
}
