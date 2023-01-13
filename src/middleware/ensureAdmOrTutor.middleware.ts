import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import Pets from "../entities/pets.entities";
import { AppError } from "../errors/appError";

const ensureAdmOrTutorMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const petRepository = AppDataSource.getRepository(Pets);
  const idPet = req.params.id;
  const userId = req.user.id;
  const isAdm = req.user.isAdm;

  const pet = await petRepository.findOne({
    where: {
      id: idPet,
    },
    relations: {
      user: true,
    },
  });

  if (!(pet?.user.id === userId) && !isAdm) {
    throw new AppError("Você não é o tutor ou administrador da aplicação", 403);
  }

  return next();
};

export default ensureAdmOrTutorMiddleware;
