import { Test, TestingModule } from '@nestjs/testing';
import { LimiarController } from './limiar.controller';
import { LimiarService } from './limiar.service';

describe('LimiarController', () => {
  let controller: LimiarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LimiarController],
      providers: [LimiarService],
    }).compile();

    controller = module.get<LimiarController>(LimiarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
