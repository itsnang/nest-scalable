import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';

describe('PaymentsController', () => {
  let paymentsController: PaymentsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PaymentsController],
      providers: [PaymentsService],
    }).compile();

    paymentsController = app.get<PaymentsController>(PaymentsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(
        paymentsController.createCharge({
          card: {
            number: '4242424242424242',
            exp_month: 12,
            exp_year: 2025,
            cvc: '123',
          },
          amount: 100,
        }),
      ).toBe('Hello World!');
    });
  });
});
