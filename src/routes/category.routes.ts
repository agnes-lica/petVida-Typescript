import { Router } from "express";
import { CategoryController } from "../controllers/category.controller";
import ensureAuthMiddleware from "../middleware/ensureAuth.middleware";

const categoryRoutes = Router();

categoryRoutes.post(
  "",
  ensureAuthMiddleware,
  CategoryController.createCategory
);

export default categoryRoutes;
