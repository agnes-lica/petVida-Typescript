import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import ensureAuthMiddleware from "../middleware/ensureAuth.middleware";
import ensureDataUpdateMiddleware from "../middleware/ensureDataUpdate.middleware";
import ensureOwner from "../middleware/ensureOwner.middleware";
import ensureUserExistence from "../middleware/ensureUserExistence.middleware";

const userRoutes = Router();

userRoutes.post("", UserController.createUser);
userRoutes.patch(
  "/:id",
  ensureAuthMiddleware,
  ensureUserExistence,
  ensureOwner,
  ensureDataUpdateMiddleware,
  UserController.updateUser
);
userRoutes.delete(
  "/:id",
  ensureAuthMiddleware,
  ensureUserExistence,
  ensureOwner,
  UserController.deleteUser
);
userRoutes.post(
  "/booking/:idPet",
  ensureAuthMiddleware,
  UserController.newBooking
);

userRoutes.get("/profile", ensureAuthMiddleware, UserController.profile);
userRoutes.get(
  "/:id/pets",
  ensureAuthMiddleware,
  ensureUserExistence,
  UserController.listPets
);

export default userRoutes;
