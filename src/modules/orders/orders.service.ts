import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './orders.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto, UpdateOrderDto } from './orders.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
  ) {}

  getAll() {
    return this.orderRepository.find();
  }

  async getOne(id: number) {
    const order = await this.orderRepository.findOne({
      where: {
        id,
      },
    });

    if (!order) {
      return new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }

    return order;
  }

  async create(order: CreateOrderDto) {
    const newOrder = this.orderRepository.create(order);
    return this.orderRepository.save(newOrder);
  }

  async update(id: number, order: UpdateOrderDto) {
    const orderFound = await this.orderRepository.findOne({
      where: {
        id,
      },
    });

    if (!orderFound) {
      return new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }

    return this.orderRepository.update(id, order);
  }

  async delete(id: number) {
    const result = await this.orderRepository.delete({ id });

    if (result.affected === 0) {
      return new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }

    return result;
  }
}
