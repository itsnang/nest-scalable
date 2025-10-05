import { CreateChargeDto } from '@app/common';
import { IsEmail } from 'class-validator';

export class PaymentCreateDto extends CreateChargeDto {
  @IsEmail()
  email: string;
}
