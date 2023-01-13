import { Router } from "express";
import { UserSessionController } from "../controllers/session.controller";

const sessionRoutes = Router();

sessionRoutes.post("", UserSessionController.userSession);

export default sessionRoutes;
