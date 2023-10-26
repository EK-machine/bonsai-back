import { Test, TestingModule } from '@nestjs/testing';
import { BonsaiService } from './bonsai.service';

describe('BonsaiService', () => {
  let service: BonsaiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BonsaiService],
    }).compile();

    service = module.get<BonsaiService>(BonsaiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
