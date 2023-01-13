import { Request, Response, NextFunction } from "express";
import "dotenv/config";
import { AppError } from "../errors/appError";
import AppDataSource from "../data-source";
import User from "../entities/users.entities";

const ensureUserExistence = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.id;
  const userRepository = AppDataSource.getRepository(User);

  const findUser = userRepository.findOneBy({ id: userId });

  if (!findUser) {
    throw new AppError("Usuário não encontrado", 400);
  }

  return next();
};

export default ensureUserExistence;
