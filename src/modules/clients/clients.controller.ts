import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';

import { ClientsService } from './clients.service';
import { CreateClientDto, UpdateClientDto } from './clients.dto';
import { Client } from './clients.entity';

@Controller('clients')
export class ClientsController {
  constructor(private clientsService: ClientsService) {}

  @Get()
  getClients(): Promise<Client[]> {
    return this.clientsService.getAll();
  }

  @Get('/:id')
  getClientById(@Param('id', ParseIntPipe) id: number) {
    return this.clientsService.getOne(id);
  }

  @Post()
  create(@Body() client: CreateClientDto) {
    return this.clientsService.create(client);
  }

  @Put('/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() client: UpdateClientDto,
  ) {
    return this.clientsService.update(id, client);
  }

  @Delete('/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.clientsService.delete(id);
  }
}
