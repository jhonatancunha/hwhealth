import { Test, TestingModule } from '@nestjs/testing';
import { LimiarService } from './limiar.service';

describe('LimiarService', () => {
  let service: LimiarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LimiarService],
    }).compile();

    service = module.get<LimiarService>(LimiarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
