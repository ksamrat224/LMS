import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { register } from 'module';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
}
