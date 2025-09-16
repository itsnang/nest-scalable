import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaymentCreateDto } from './dto/payment-create.dto';
import { PaymentsService } from './payments.service';

@Controller()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @MessagePattern('create-charge')
  @UsePipes(new ValidationPipe())
  async createCharge(@Payload() data: PaymentCreateDto) {
    return this.paymentsService.createCharge(data);
  }
}
