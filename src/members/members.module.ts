import { Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [MembersController],
  providers: [MembersService, PrismaClient],
})
export class MembersModule {}
