import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { Category } from './categories.entity';
import { CreateCategoryDto, UpdateCategoryDto } from './categories.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  getAll() {
    return this.categoriesRepository.find();
  }

  async getOne(id: number) {
    const categoryFound = await this.categoriesRepository.findOne({
      where: {
        id,
      },
    });

    if (!categoryFound) {
      return new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }

    return categoryFound;
  }

  async create(category: CreateCategoryDto) {
    const categoryFound = await this.categoriesRepository.findOne({
      where: {
        name: category.name,
      },
    });

    if (categoryFound) {
      return new HttpException('Category already exists', HttpStatus.CONFLICT);
    }

    const newCategory = this.categoriesRepository.create(category);
    return this.categoriesRepository.save(newCategory);
  }

  async update(id: number, category: UpdateCategoryDto) {
    const categoryFound = await this.categoriesRepository.findOne({
      where: {
        id,
      },
    });

    if (!categoryFound) {
      return new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }

    return this.categoriesRepository.update(id, category);
  }

  async delete(id: number) {
    const result = await this.categoriesRepository.delete({ id });

    if (result.affected === 0) {
      return new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }

    return result;
  }
}
