import { Test, TestingModule } from '@nestjs/testing';
import { FundController } from './fund.controller';
import { FundService } from './fund.service';

describe('FundController', () => {
  let fundController: FundController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [FundController],
      providers: [FundService],
    }).compile();

    fundController = app.get<FundController>(FundController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(fundController.getHello()).toBe('Hello World!');
    });
  });
});
