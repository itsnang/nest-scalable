import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateChargeDto } from './dto/create-charge.dto';
import { PaymentsService } from './payments.service';

@Controller()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @MessagePattern('create-charge')
  async createCharge(@Payload() data: CreateChargeDto) {
    return this.paymentsService.createCharge(data);
  }
}
