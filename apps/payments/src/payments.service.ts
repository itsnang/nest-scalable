import { CreateChargeDto } from '@app/common';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

// TODO: Replace with actual Stripe integration once account is configured
// Currently using mock implementation for development purposes (KJEL NAS>,<)
@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(
    this.configService.get('STRIPE_SECRET_KEY'),
  );
  constructor(private readonly configService: ConfigService) {}

  async createCharge(createChargeDto: CreateChargeDto) {
    console.log('Mock Payment Processing:', {
      amount: createChargeDto.amount,
      cardLast4: createChargeDto.card.token.slice(-4),
    });

    // Return mock PaymentIntent data
    return {
      id: `pi_mock_${Date.now()}`,
      amount: createChargeDto.amount * 100,
      currency: 'usd',
      status: 'succeeded',
      created: Math.floor(Date.now() / 1000),
    };
  }
}
