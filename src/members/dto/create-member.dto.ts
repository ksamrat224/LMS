import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateMemberDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(15)
  mobile: string;

  @IsNotEmpty()
  @IsString()
  address: string;
}
