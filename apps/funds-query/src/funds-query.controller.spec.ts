import { Test, TestingModule } from '@nestjs/testing';
import { FundsQueryController } from './funds-query.controller';
import { FundsQueryService } from './funds-query.service';

describe('FundsQueryController', () => {
  let fundsQueryController: FundsQueryController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [FundsQueryController],
      providers: [FundsQueryService],
    }).compile();

    fundsQueryController = app.get<FundsQueryController>(FundsQueryController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(fundsQueryController.getHello()).toBe('Hello World!');
    });
  });
});
