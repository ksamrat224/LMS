import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MembersModule } from './members/members.module';
import { BooksModule } from './books/books.module';
import { TransactionsModule } from './transactions/transactions.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    MembersModule,
    BooksModule,
    TransactionsModule,
    UsersModule,
    CloudinaryModule,
    AuthModule,
    MailerModule.forRoot({
      transport: {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
    }),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST!,
        port: parseInt(process.env.REDIS_PORT!),
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
