import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import Hotel from "../entities/hotel.entities";
import { AppError } from "../errors/appError";

const ensureManager = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const hostelRepository = AppDataSource.getRepository(Hotel);

  const idHotel = req.params.idHotel;

  const userId = req.user.id;

  const hotel = await hostelRepository.findOne({
    where: {
      id: idHotel,
    },
    relations: {
      manager: true,
    },
  });

  if (hotel?.manager.id !== userId) {
    throw new AppError("Token is invalid", 401);
  }

  return next();
};

export default ensureManager;
