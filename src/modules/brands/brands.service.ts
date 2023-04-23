import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { Brand } from './brands.entity';
import { CreateBrandDto, UpdateBrandDto } from './brands.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand) private brandsRepository: Repository<Brand>,
  ) {}

  getAll() {
    return this.brandsRepository.find();
  }

  async getOne(id: number) {
    const brandFound = await this.brandsRepository.findOne({
      where: {
        id,
      },
    });

    if (!brandFound) {
      return new HttpException('Brand not found', HttpStatus.NOT_FOUND);
    }

    return brandFound;
  }

  async create(brand: CreateBrandDto) {
    const brandFound = await this.brandsRepository.findOne({
      where: {
        name: brand.name,
      },
    });

    if (brandFound) {
      return new HttpException('Brand already exists', HttpStatus.CONFLICT);
    }

    const newBrand = this.brandsRepository.create(brand);
    return this.brandsRepository.save(newBrand);
  }

  async update(id: number, brand: UpdateBrandDto) {
    const brandFound = await this.brandsRepository.findOne({
      where: {
        id,
      },
    });

    if (!brandFound) {
      return new HttpException('Brand not found', HttpStatus.NOT_FOUND);
    }

    return this.brandsRepository.update(id, brand);
  }

  async delete(id: number) {
    const result = await this.brandsRepository.delete({ id });

    if (result.affected === 0) {
      return new HttpException('Brand not found', HttpStatus.NOT_FOUND);
    }

    return result;
  }
}
