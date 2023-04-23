import { IsNumber, IsPositive, IsNotEmpty } from 'class-validator';

import { PartialType } from '@nestjs/swagger';

export class CreateOrderDto {
  @IsPositive()
  @IsNotEmpty()
  readonly quantity: number;

  @IsNotEmpty()
  readonly clientId: number;

  @IsNumber()
  @IsPositive()
  readonly totalPrice: number;
}

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}
