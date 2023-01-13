import { Router } from "express";
import { BookingController } from "../controllers/booking.controller";
import ensureAuthMiddleware from "../middleware/ensureAuth.middleware";
import ensureBookingExistence from "../middleware/ensureBookingExistence.middleware";
import ensureEmployeeMiddleware from "../middleware/ensureEmployee.middleware";
import ensureHotelExistence from "../middleware/ensureHotelExistence.middleware";
import managerOrEmployers from "../middleware/managerOrEmployers.middlewares";

const bookingRoutes = Router();

bookingRoutes.patch(
  "/checkin/:idBooking",
  ensureAuthMiddleware,
  ensureBookingExistence,
  ensureEmployeeMiddleware,
  BookingController.checkin
);
bookingRoutes.patch(
  "/checkout/:idBooking",
  ensureAuthMiddleware,
  ensureBookingExistence,
  ensureEmployeeMiddleware,
  BookingController.checkout
);
bookingRoutes.patch(
  "/confirm/:idBooking",
  ensureAuthMiddleware,
  managerOrEmployers,
  ensureBookingExistence,
  BookingController.confirm
);
bookingRoutes.get(
  "/confirm/:idHotel/:idBooking",
  ensureAuthMiddleware,
  ensureEmployeeMiddleware,
  ensureHotelExistence,
  ensureBookingExistence,
  BookingController.getOnebookingConfirmed
);
bookingRoutes.get(
  "/confirm/:idHotel",
  ensureAuthMiddleware,
  ensureEmployeeMiddleware,
  ensureHotelExistence,
  BookingController.getAllbookingConfirmed
);
bookingRoutes.delete(
  "/confirm/:idBooking",
  ensureAuthMiddleware,
  ensureEmployeeMiddleware,
  ensureBookingExistence,
  BookingController.cancelConfirmBooking
);

bookingRoutes.delete(
  "/:idBooking",
  ensureAuthMiddleware,
  ensureEmployeeMiddleware,
  ensureBookingExistence,
  BookingController.deleteBooking
);

export default bookingRoutes;
