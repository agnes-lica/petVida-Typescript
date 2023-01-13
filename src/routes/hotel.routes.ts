import { Router } from "express";
import { HotelController } from "../controllers/hotel.controller";
import ensureAuthMiddleware from "../middleware/ensureAuth.middleware";
import ensureHotelExistence from "../middleware/ensureHotelExistence.middleware";
import ensureManager from "../middleware/ensureManager.middleware";

const hotelRoutes = Router();

hotelRoutes.get(
  "/:idHotel/pets",
  ensureAuthMiddleware,
  ensureHotelExistence,
  ensureManager,
  HotelController.listHospPets
);

hotelRoutes.patch(
  "/:idHotel",
  ensureAuthMiddleware,
  ensureHotelExistence,
  ensureManager,
  HotelController.updateHotel
);

hotelRoutes.delete(
  "/:idHotel",
  ensureAuthMiddleware,
  ensureHotelExistence,
  ensureManager,
  HotelController.delete
);

hotelRoutes.get(
  "/:idHotel/bookings",
  ensureAuthMiddleware,
  ensureHotelExistence,
  ensureManager,
  HotelController.getBookings
);

export default hotelRoutes;
