import { PAYMENTS_SERVICE, UserDto } from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { from, switchMap } from 'rxjs';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsRepository } from './reservations.repository';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservationsRepository: ReservationsRepository,
    @Inject(PAYMENTS_SERVICE)
    private readonly paymentServiceClient: ClientProxy,
  ) {}
  create(
    createReservationDto: CreateReservationDto,
    { email, _id: userId }: UserDto,
  ) {
    return this.paymentServiceClient
      .send('create-charge', {
        ...createReservationDto.charge,
        email,
      })
      .pipe(
        switchMap((paymentResponse) => {
          return from(
            this.reservationsRepository.create({
              ...createReservationDto,
              invoiceId: paymentResponse.id,
              timestamp: new Date(),
              userId,
            }),
          );
        }),
      );
  }

  async findAll() {
    return this.reservationsRepository.find({});
  }

  async findOne(id: string) {
    return this.reservationsRepository.findOne({ _id: id });
  }

  async update(id: string, updateReservationDto: UpdateReservationDto) {
    return this.reservationsRepository.findOneAndUpdate(
      {
        _id: id,
      },
      {
        $set: updateReservationDto,
      },
    );
  }

  async remove(id: string) {
    return this.reservationsRepository.findOneAndDelete({ _id: id });
  }
}
