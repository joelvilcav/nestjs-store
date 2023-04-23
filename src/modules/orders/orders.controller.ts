import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './orders.entity';
import { CreateOrderDto, UpdateOrderDto } from './orders.dto';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get()
  getClients(): Promise<Order[]> {
    return this.ordersService.getAll();
  }

  @Get('/:id')
  getClientById(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.getOne(id);
  }

  @Post()
  create(@Body() order: CreateOrderDto) {
    return this.ordersService.create(order);
  }

  @Put('/:id')
  update(@Param('id', ParseIntPipe) id: number, @Body() order: UpdateOrderDto) {
    return this.ordersService.update(id, order);
  }

  @Delete('/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.delete(id);
  }
}
