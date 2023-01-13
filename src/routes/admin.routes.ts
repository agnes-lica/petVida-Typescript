import { Router } from "express";
import adminController from "../controllers/admin.controller";
import ensureAdm from "../middleware/ensureAdm.middleware";
import ensureAuthMiddleware from "../middleware/ensureAuth.middleware";
import ensureHotelExistence from "../middleware/ensureHotelExistence.middleware";

const adminRoutes = Router();

adminRoutes.post(
  "/hotel",
  ensureAuthMiddleware,
  ensureAdm,
  adminController.createHotel
);
adminRoutes.patch(
  "/hotel/:idHotel",
  ensureAuthMiddleware,
  ensureAdm,
  ensureHotelExistence,
  adminController.updateHotel
);
adminRoutes.delete(
  "/hotel/:idHotel",
  ensureAuthMiddleware,
  ensureAdm,
  ensureHotelExistence,
  adminController.deleteHotel
);
adminRoutes.get(
  "/hotels",
  ensureAuthMiddleware,
  ensureAdm,
  adminController.getHotels
);

adminRoutes.post(
  "/category",
  ensureAuthMiddleware,
  ensureAdm,
  adminController.createCategory
);

adminRoutes.get(
  "/users",
  ensureAuthMiddleware,
  ensureAdm,
  adminController.listAllUsers
);

adminRoutes.get(
  "/pets",
  ensureAuthMiddleware,
  ensureAdm,
  adminController.listAllPets
);

adminRoutes.get(
  "/categories",
  ensureAuthMiddleware,
  ensureAdm,
  adminController.listAllCategories
);

adminRoutes.get(
  "/bookings",
  ensureAuthMiddleware,
  ensureAdm,
  adminController.listAllBookings
);

export default adminRoutes;
