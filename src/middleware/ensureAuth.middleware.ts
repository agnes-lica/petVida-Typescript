import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { AppError } from "../errors/appError";

const ensureAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers.authorization;

  if (!token) throw new AppError("Token de autorização faltando", 400);

  token = token.split(" ")[1];

  jwt.verify(token, String(process.env.SECRET_KEY), (error, decoded: any) => {
    if (error) throw new AppError("Token de autorização inválido", 401);

    req.user = {
      isAdm: decoded.isAdm,
      email: decoded.email,
      id: decoded.id,
    };

    return next();
  });
};

export default ensureAuthMiddleware;
