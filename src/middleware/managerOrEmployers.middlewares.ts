import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import User from "../entities/users.entities";
import { AppError } from "../errors/appError";

const managerOrEmployers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userRepository = AppDataSource.getRepository(User);

  const idUser = req.user.id;

  const hotel = await userRepository.findOneBy({ id: idUser });

  if (hotel == null || hotel == undefined)
    throw new AppError("Você não é o gerente ou funcionário do hotel", 403);

  return next();
};

export default managerOrEmployers;
