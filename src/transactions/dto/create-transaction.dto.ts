import { ReservationType } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateTransactionDto {
  @IsOptional()
  @IsNumber()
  user_id: number;

  @IsNotEmpty()
  @IsNumber()
  book_id: number;

  @IsNotEmpty()
  @IsNumber()
  member_id: number;

  @IsOptional()
  @IsEnum(ReservationType)
  type: ReservationType;
}