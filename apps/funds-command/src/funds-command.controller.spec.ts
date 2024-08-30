import { Test, TestingModule } from '@nestjs/testing';
import { FundsCommandController } from './funds-command.controller';
import { FundsCommandService } from './funds-command.service';

describe('FundsCommandController', () => {
  let fundsCommandController: FundsCommandController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [FundsCommandController],
      providers: [FundsCommandService],
    }).compile();

    fundsCommandController = app.get<FundsCommandController>(FundsCommandController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(fundsCommandController.getHello()).toBe('Hello World!');
    });
  });
});
