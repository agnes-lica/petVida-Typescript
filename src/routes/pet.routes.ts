import { Router } from "express";
import { PetController } from "../controllers/pet.controller";
import ensureAdmOrTutorMiddleware from "../middleware/ensureAdmOrTutor.middleware";
import ensureAuthMiddleware from "../middleware/ensureAuth.middleware";
import ensureBookingExistence from "../middleware/ensureBookingExistence.middleware";
import ensurePetExistence from "../middleware/ensurePetExistence.middleware";

const petsRoutes = Router();

petsRoutes.post("", ensureAuthMiddleware, PetController.create);
petsRoutes.patch(
  "/:idPet",
  ensureAuthMiddleware,
  ensurePetExistence,
  ensureAdmOrTutorMiddleware,
  PetController.update
);
petsRoutes.get(
  "/:idPet",
  ensureAuthMiddleware,
  ensurePetExistence,
  ensureAdmOrTutorMiddleware,
  PetController.listById
);

petsRoutes.get(
  "/:idPet/bookings",
  ensureAuthMiddleware,
  ensurePetExistence,
  ensureAdmOrTutorMiddleware,
  PetController.listBooking
);
petsRoutes.delete(
  "/:idPet",
  ensureAuthMiddleware,
  ensurePetExistence,
  ensureAdmOrTutorMiddleware,
  PetController.delete
);

export default petsRoutes;
