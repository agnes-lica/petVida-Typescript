import { Request, Response } from "express";
import { ISession } from "../interfaces/session.interfaces";
import { UserSessionService } from "../services/session.service";

export class UserSessionController {
  static async userSession(req: Request, res: Response) {
    const session: ISession = req.body;

    const token = await UserSessionService.userSession(session);
    return res.status(200).json({ token });
  }
}
