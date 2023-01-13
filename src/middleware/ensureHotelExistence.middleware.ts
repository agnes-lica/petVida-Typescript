import { Request, Response, NextFunction } from "express";
import "dotenv/config";
import { AppError } from "../errors/appError";
import AppDataSource from "../data-source";
import Hotel from "../entities/hotel.entities";
const ensureHotelExistence = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const hotelId = req.params.idHotel;
  const hotelRepository = AppDataSource.getRepository(Hotel);

  const findHotel = await hotelRepository.findOneBy({ id: hotelId });

  if (!findHotel) {
    throw new AppError("Hotel não encontrado", 400);
  }

  return next();
};

export default ensureHotelExistence;
