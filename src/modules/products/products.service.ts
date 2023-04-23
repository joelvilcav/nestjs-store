import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Product } from './products.entity';
import { CreateProductDto, UpdateProductDto } from './products.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BrandsService } from '../brands/brands.service';
import { CategoriesService } from '../categories/categories.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
    private brandsService: BrandsService,
    private categoriesService: CategoriesService,
  ) {}

  getAll() {
    return this.productsRepository.find();
  }

  async getOne(id: number) {
    const product = await this.productsRepository.findOne({
      where: {
        id,
      },
    });

    if (!product)
      return new HttpException('Product not found', HttpStatus.NOT_FOUND);

    return product;
  }

  async create(product: CreateProductDto) {
    const brandFound = await this.brandsService.getOne(product.brandId);
    const categoryFound = await this.categoriesService.getOne(
      product.categoryId,
    );

    if (!brandFound || !categoryFound) {
      return new HttpException(
        'Brand or Category was not found',
        HttpStatus.NOT_FOUND,
      );
    }

    const newProduct = this.productsRepository.create(product);
    return this.productsRepository.save(newProduct);
  }

  async update(id: number, product: UpdateProductDto) {
    const productFound = await this.productsRepository.findOne({
      where: {
        id,
      },
    });

    if (!productFound) {
      return new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    return this.productsRepository.update(id, product);
  }

  async delete(id: number) {
    const result = await this.productsRepository.delete({ id });

    if (result.affected === 0) {
      return new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    return result;
  }
}
