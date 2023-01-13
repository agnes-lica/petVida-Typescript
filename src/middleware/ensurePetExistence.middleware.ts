import { Request, Response, NextFunction } from "express";
import "dotenv/config";
import { AppError } from "../errors/appError";
import AppDataSource from "../data-source";
import User from "../entities/users.entities";
import Pets from "../entities/pets.entities";
const ensurePetExistence = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const petId = req.params.idPet;
  const petRepository = AppDataSource.getRepository(Pets);

  const findPet = await petRepository.findOneBy({ id: petId });

  if (!findPet) {
    throw new AppError("Pet não encontrado", 400);
  }

  return next();
};

export default ensurePetExistence;
