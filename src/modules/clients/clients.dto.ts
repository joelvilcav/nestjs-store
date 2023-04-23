import {
  IsString,
  IsNumber,
  IsPositive,
  IsEmail,
  IsNotEmpty,
} from 'class-validator';

import { PartialType } from '@nestjs/swagger';

export class CreateClientDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNumber()
  @IsPositive()
  readonly phone: number;

  @IsString()
  @IsEmail()
  readonly email: string;

  @IsNumber()
  @IsPositive()
  readonly age: number;

  @IsString()
  readonly birthday: string;
}

export class UpdateClientDto extends PartialType(CreateClientDto) {}
