import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import Booking from "../entities/booking.entities";
import Hotel from "../entities/hotel.entities";
import { AppError } from "../errors/appError";

const ensureEmployeeMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const idUser = req.user.id;
  const idBooking = req.params.idHotel;

  const bookingRepository = AppDataSource.getRepository(Booking);
  const hotelRepository = AppDataSource.getRepository(Hotel);

  const booking = await bookingRepository.findOneBy({ id: idBooking });

  const hotel = await hotelRepository.findOne({
    where: {
      id: booking?.hotel.id,
    },
    relations: {
      manager: true,
    },
  });

  if (idUser !== hotel?.manager.id)
    throw new AppError("Você não é gerente do hotel");

  return next();
};

export default ensureEmployeeMiddleware;
