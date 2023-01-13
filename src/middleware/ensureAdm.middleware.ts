import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/appError";

const ensureAdm = async (req: Request, res: Response, next: NextFunction) => {
  const isAdm = req.user.isAdm;

  if (!isAdm) throw new AppError("Você não é administrador da aplicação", 403);

  return next();
};

export default ensureAdm;
