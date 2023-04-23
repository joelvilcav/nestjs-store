import { IsString, IsNumber, IsPositive, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly price: number;

  @IsPositive()
  @IsNotEmpty()
  readonly brandId: number;

  @IsPositive()
  @IsNotEmpty()
  readonly categoryId: number;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
