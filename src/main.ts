import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AuthGuard } from './guards/auth/auth.guard';
import { JwtService } from '@nestjs/jwt';

async function bootstrap() {
  //application instance is created here
  const app = await NestFactory.create(AppModule);

  //MiddleWare is applied here
  app.useGlobalPipes(new ValidationPipe());

  //Middleware for guard
  app.useGlobalGuards(new AuthGuard(new JwtService()));

  //application starts here
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
