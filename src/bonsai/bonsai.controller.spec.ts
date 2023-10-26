import { Test, TestingModule } from '@nestjs/testing';
import { BonsaiController } from './bonsai.controller';

describe('BonsaiController', () => {
  let controller: BonsaiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BonsaiController],
    }).compile();

    controller = module.get<BonsaiController>(BonsaiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
