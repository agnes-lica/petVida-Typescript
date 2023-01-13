import AppDataSource from "../data-source";
import Booking from "../entities/booking.entities";
import Hotel from "../entities/hotel.entities";
import { AppError } from "../errors/appError";

export class BookingService {
  static async confirm(id: string): Promise<void> {
    const bookingRepository = AppDataSource.getRepository(Booking);
    const booking = await bookingRepository.findOne({ where: { id } });

    if (booking?.isConfirmed)
      throw new AppError("Reserva ja foi confirmada", 400);

    const bookingFound = await bookingRepository.findOneBy({
      bookingDate: booking?.bookingDate,
      isConfirmed: true,
      pets: {
        id: booking?.pets.id,
      },
    });

    if (bookingFound) {
      throw new AppError("O pet ja tem uma reserva confirmada nesse dia", 400);
    }

    await bookingRepository.update(id, {
      isConfirmed: true,
    });
  }

  static async checkin(id: string) {
    const bookingRepository = AppDataSource.getRepository(Booking);
    const booking = await bookingRepository.findOne({ where: { id } });

    if (!booking?.isConfirmed)
      throw new AppError(
        "Não é possível realizar o checkin sem a confirmação do agendamento",
        400
      );
    if (booking?.checkin) {
      throw new AppError("Pet já entrou no hotel", 400);
    }

    await bookingRepository.update(id, {
      checkin: true,
      dateCheckin: new Date(),
    });
  }

  static async cancelConfirmBooking(id: string): Promise<void> {
    const bookingRepository = AppDataSource.getRepository(Booking);
    const booking = await bookingRepository.findOneBy({ id });

    if (booking?.checkin) {
      throw new AppError("Pet já entrou no hotel", 400);
    }
    if (booking?.checkout) {
      throw new AppError("Pet já saiu no hotel", 400);
    }

    if (booking?.isConfirmed === true) {
      await bookingRepository.update(id, {
        isConfirmed: false,
      });
    } else {
      throw new AppError("Booking não confirmado", 400);
    }
  }
  static async deleteBooking(id: string): Promise<void> {
    const bookingRepository = AppDataSource.getRepository(Booking);
    const booking = await bookingRepository.findOneBy({ id });

    if (!booking?.isConfirmed) {
      await bookingRepository.delete(id);
    } else {
      throw new AppError("Booking já confirmado", 400);
    }
  }

  static async checkout(id: string): Promise<void> {
    const bookingRepository = AppDataSource.getRepository(Booking);

    const booking = await bookingRepository.findOneBy({ id });

    if (!booking?.checkin)
      throw new AppError(
        "Não é possível realizar o checkout sem ter feito o checkin",
        403
      );

    if (booking?.checkout) {
      throw new AppError("Pet já saiu no hotel", 400);
    }

    await bookingRepository.update(id, {
      checkout: true,
      dateCheckout: new Date(),
    });
  }

  static async getAllConfirmedBooking(id: string): Promise<Booking[]> {
    const bookingRepository = AppDataSource.getRepository(Booking);
    const hotelRepository = AppDataSource.getRepository(Hotel);

    const hotel = await hotelRepository.findOne({
      where: {
        id,
      },
    });

    const booking = await bookingRepository.findBy({
      isConfirmed: true,
      hotel: {
        id: hotel!.id,
      },
    });

    return booking;
  }

  static async getOneConfirmedBooking(
    idHotel: string,
    idBooking: string
  ): Promise<Booking> {
    const bookingRepository = AppDataSource.getRepository(Booking);
    const hotelRepository = AppDataSource.getRepository(Hotel);

    const hotel = await hotelRepository.findOne({
      where: {
        id: idHotel,
      },
    });

    const booking = await bookingRepository.findOne({
      where: {
        id: idBooking,
        isConfirmed: true,
        hotel: {
          id: hotel!.id,
        },
      },
    });

    return booking!;
  }
}
