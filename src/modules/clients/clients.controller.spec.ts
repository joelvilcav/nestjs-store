import { Test, TestingModule } from '@nestjs/testing';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';

describe('Controller', () => {
  let Controller: ClientsController;

  const mockClientsService = {
    getClients: jest.fn(() => {
      return [
        {
          id: Date.now(),
          name: 'Joel',
          phone: 123,
          email: 'email@email.com',
          age: 25,
          birthday: '2020-20-20',
        },
      ];
    }),

    getClientById: jest.fn(() => {
      return {
        id: Date.now(),
        name: 'Joel',
        phone: 123,
        email: 'email@email.com',
        age: 25,
        birthday: '2020-20-20',
      };
    }),

    create: jest.fn((dto) => {
      return {
        id: Date.now(),
        ...dto,
      };
    }),

    update: jest.fn((id, dto) => {
      return {
        id,
        ...dto,
      };
    }),

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    delete: jest.fn((id) => {
      return {
        raw: [],
        affected: 1,
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientsController],
      providers: [ClientsService],
    })
      .overrideProvider(ClientsService)
      .useValue(mockClientsService)
      .compile();

    Controller = module.get<ClientsController>(ClientsController);
  });

  it('should be defined', () => {
    expect(Controller).toBeDefined();
  });

  it('should return all clients in an array', () => {
    expect(Controller.getClients()).toEqual([
      {
        id: expect.any(Number),
        name: expect.any(String),
        phone: expect.any(Number),
        email: expect.any(String),
        age: expect.any(Number),
        birthday: expect.any(String),
      },
    ]);
    expect(mockClientsService.getClients()).toBeInstanceOf(Array);
    expect(mockClientsService.getClients).toHaveBeenCalled();
  });

  it('should return a single client', () => {
    expect(Controller.getClientById(1)).toEqual({
      id: expect.any(Number),
      name: expect.any(String),
      phone: expect.any(Number),
      email: expect.any(String),
      age: expect.any(Number),
      birthday: expect.any(String),
    });
    expect(mockClientsService.getClientById()).toBeInstanceOf(Object);
    expect(mockClientsService.getClientById).toHaveBeenCalled();
  });

  it('should create a client', () => {
    const dto = {
      name: 'Joel',
      phone: 123,
      email: 'email@email.com',
      age: 25,
      birthday: '2020-20-20',
    };

    expect(Controller.create(dto)).toEqual({
      id: expect.any(Number),
      name: dto.name,
      phone: dto.phone,
      email: dto.email,
      age: dto.age,
      birthday: dto.birthday,
    });

    expect(mockClientsService.create).toHaveBeenCalled();
  });

  it('should update a client', () => {
    const dto = {
      name: 'Joel',
      phone: 123,
      email: 'email@email.com',
      age: 25,
      birthday: '2020-20-20',
    };

    expect(Controller.update(1, dto)).toEqual({
      id: 1,
      ...dto,
    });

    expect(mockClientsService.update).toHaveBeenCalled();
  });

  it('should delete a client', () => {
    expect(Controller.delete(1)).toEqual({
      raw: [],
      affected: 1,
    });
  });
});
