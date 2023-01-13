import AppDataSource from "../data-source";
import User from "../entities/users.entities";
import { ISession } from "../interfaces/session.interfaces";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { AppError } from "../errors/appError";

export class UserSessionService {
  static async userSession({ email, password }: ISession): Promise<String> {
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOneBy({ email: email });

    if (!user) {
      throw new AppError("email ou senha inválidos", 403);
    }

    const comparePassword = await compare(password, user.password);

    if (!comparePassword) {
      throw new AppError("email ou senha inválidos", 403);
    }

    const decoded = {
      isAdm: user.isAdm,
      id: user.id,
      email: user.email,
    };
    const options = {
      expiresIn: "1d",
      subject: user.id,
    };

    const token = jwt.sign(decoded, String(process.env.SECRET_KEY), options);

    return token;
  }
}
