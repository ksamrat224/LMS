import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class MembersService {
  //dependency injection
  constructor(private readonly prisma: PrismaClient) {}

  async create(createMemberDto: CreateMemberDto) {
    return this.prisma.member.create({
      data: createMemberDto,
    });
  }

  async findAll() {
    return this.prisma.member.findMany();
  }

  async findOne(id: number) {
    const todo = await this.prisma.member.findUnique({
      where: { id },
    });
    if (!todo) {
      throw new NotFoundException('Member is not found');
    }
    return todo;
  }

  async update(id: number, updateMemberDto: UpdateMemberDto) {
    await this.findOne(id);
    return this.prisma.member.update({
      where: { id },
      data: updateMemberDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.member.delete({
      where: { id },
    });
  }
}
