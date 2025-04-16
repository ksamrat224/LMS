import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaClient } from '@prisma/client';
import { UsersService } from 'src/users/users.service';
import { JwtModule } from '@nestjs/jwt';
import { BullModule } from '@nestjs/bull';
import { AuthProcessor } from './auth.processor';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '15d' },
    }),
    BullModule.registerQueue({
      name:'auth',
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaClient, UsersService,AuthProcessor],
})
export class AuthModule {}
