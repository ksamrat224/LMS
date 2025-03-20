import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  //application instance is created here
  const app = await NestFactory.create(AppModule);

  //MiddleWare is applied here
  app.useGlobalPipes(new ValidationPipe());

  //application starts here
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
