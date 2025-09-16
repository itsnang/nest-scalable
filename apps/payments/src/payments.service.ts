import { CreateChargeDto } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);
  private readonly stripe = new Stripe(
    this.configService.get('STRIPE_SECRET_KEY'),
  );

  constructor(private readonly configService: ConfigService) {}

  async createCharge(createChargeDto: CreateChargeDto) {
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: createChargeDto.amount * 100,
        currency: 'usd',
        confirm: true,
        payment_method: 'pm_card_visa',
        automatic_payment_methods: {
          enabled: true,
          allow_redirects: 'never',
        },
        return_url: `${this.configService.get('CLIENT_URL') || 'http://localhost:3000'}/payment/return`,
      });

      this.logger.log('PaymentIntent created successfully', {
        paymentIntentId: paymentIntent.id,
        amount: createChargeDto.amount,
        status: paymentIntent.status,
      });

      return {
        id: paymentIntent.id,
        status: paymentIntent.status,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        client_secret: paymentIntent.client_secret,
      };
    } catch (error) {
      this.logger.error('Failed to create PaymentIntent', {
        error: error.message,
        amount: createChargeDto.amount,
        errorType: error.type,
      });

      throw new Error(`Payment processing failed: ${error.message}`);
    }
  }
}
