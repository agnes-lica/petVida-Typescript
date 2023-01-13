import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/appError";

const ensureDataUpdateMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userData = req.body;

  const keys = Object.keys(userData);

  if (userData.isAdm !== undefined) {
    throw new AppError("Atualização de campos não autorizados", 403);
  }
  if (userData.funcEmpresaId !== undefined) {
    throw new AppError("Atualização de campos não autorizados", 403);
  }

  if (userData.staffHotelId !== undefined) {
    throw new AppError("Atualização de campos não autorizados", 403);
  }

  if (userData.isActive !== undefined) {
    throw new AppError("Atualização de campos não autorizados", 403);
  }

  return next();
};
export default ensureDataUpdateMiddleware;
