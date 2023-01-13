import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/appError";

const ensureOwner = async (req: Request, res: Response, next: NextFunction) => {
  const idLogin = req.user.id;
  const isAdm = req.user.isAdm;
  const { id } = req.params;

  if (!isAdm && id !== idLogin) {
    throw new AppError("O usuário não é dono do recurso ou administrador", 403);
  }
  return next();
};

export default ensureOwner;
