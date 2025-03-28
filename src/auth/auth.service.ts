import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly usersService: UsersService,
  ) {}
  async register(registerDto: RegisterDto) {
    const user = await this.usersService.create(registerDto);
    return user;
  }
  async login(loginDto: LoginDto) {}
}
