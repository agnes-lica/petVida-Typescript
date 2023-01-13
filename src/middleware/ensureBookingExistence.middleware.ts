import { Request, Response, NextFunction } from "express";
import "dotenv/config";
import { AppError } from "../errors/appError";
import AppDataSource from "../data-source";
import Booking from "../entities/booking.entities";
const ensureBookingExistence = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bookingId = req.params.idBooking;

  const bookingRepository = AppDataSource.getRepository(Booking);

  const findBooking = await bookingRepository.findOneBy({ id: bookingId });

  if (!findBooking) {
    throw new AppError("Agendamento não encontrado", 400);
  }

  return next();
};

export default ensureBookingExistence;
