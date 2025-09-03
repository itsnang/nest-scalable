import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
  private readonly = new Stripe(this.configService.get('STRIPE_SECRET_KEY'));
  constructor(private readonly configService: ConfigService) {}
  getHello(): string {
    return 'Hello World!';
  }
}
