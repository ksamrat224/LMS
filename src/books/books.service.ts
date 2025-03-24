import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class BooksService {
  //dependency injection
  constructor(private readonly prisma: PrismaClient) {}

  async create(createBookDto: CreateBookDto) {
    createBookDto.user_id = 1;
    return this.prisma.book.create({
      data: createBookDto,
    });
  }

  async findAll() {
    return this.prisma.book.findMany();
  }

  async findOne(id: number) {
    const book = await this.prisma.book.findUnique({
      where: { id },
    });
    if (!book) {
      throw new NotFoundException('Book Not Found');
    }
    return book;
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    await this.findOne(id);
    return this.prisma.book.update({
      where: { id },
      data: updateBookDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.book.delete({
      where: { id },
    });
  }
}
