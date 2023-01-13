import AppDataSource from "../data-source";
import Booking from "../entities/booking.entities";
import Hotel from "../entities/hotel.entities";
import { IHotelUpdateRequest } from "../interfaces/interfaces";

export class HotelService {
  static async lisHosptPets(id: string) {
    const bookingRepository = AppDataSource.getRepository(Booking);

    const booking = await bookingRepository.findBy({
      checkin: true,
      checkout: false,
      hotel: {
        id,
      },
    });

    const pets = booking.map((booking) => {
      return booking.pets;
    });

    return pets!;
  }

  static async updateHotel(
    hotelId: string,
    data: IHotelUpdateRequest
  ): Promise<Hotel> {
    const hotelRepository = AppDataSource.getRepository(Hotel);

    const { capacity, cnpj, fantasyName, corporateName } = data;

    await hotelRepository.update(hotelId, {
      capacity,
      cnpj,
      fantasyName,
      corporateName,
    });

    const updatedHotel = await hotelRepository.findOneBy({ id: hotelId });

    return updatedHotel!;
  }
  static async deleteHotel(hotelId: string): Promise<void> {
    const hotelRepository = AppDataSource.getRepository(Hotel);

    await hotelRepository.update(hotelId, {
      isActive: false,
    });
  }

  static async getHotelBookings(hotelId: string): Promise<Booking[]> {
    const bookingRepository = AppDataSource.getRepository(Booking);

    const bookings = bookingRepository.findBy({
      hotel: {
        id: hotelId,
      },
    });

    return bookings;
  }
}
