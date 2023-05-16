import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Client } from './clients.entity';
import { CreateClientDto, UpdateClientDto } from './clients.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client) private clientRepository: Repository<Client>,
  ) {}

  getClients() {
    return this.clientRepository.find();
  }

  async getClientById(id: number) {
    const client = await this.clientRepository.findOne({
      where: {
        id,
      },
    });

    if (!client) {
      return new HttpException('Client not found', HttpStatus.NOT_FOUND);
    }

    return client;
  }

  async create(client: CreateClientDto) {
    const userFound = await this.clientRepository.findOne({
      where: {
        name: client.name,
      },
    });

    if (userFound) {
      return new HttpException('Client already exists', HttpStatus.CONFLICT);
    }

    const newClient = this.clientRepository.create(client);
    return this.clientRepository.save(newClient);
  }

  async update(id: number, client: UpdateClientDto) {
    const clientFound = await this.clientRepository.findOne({
      where: {
        id,
      },
    });

    if (!clientFound) {
      return new HttpException('Client not found', HttpStatus.NOT_FOUND);
    }

    return this.clientRepository.update(id, client);
  }

  async delete(id: number) {
    const result = await this.clientRepository.delete({ id });

    if (result.affected === 0) {
      return new HttpException('Client not found', HttpStatus.NOT_FOUND);
    }

    return result;
  }
}
