import "reflect-metadata";
import "express-async-errors";
import express from "express";
import ErrorMiddleware from "./middleware/handleError.middlewere";
import adminRoutes from "./routes/admin.routes";
import categoryRoutes from "./routes/category.routes";
import sessionRoutes from "./routes/session.routes";
import userRoutes from "./routes/user.routes";
import petRoutes from "./routes/pet.routes";
import bookingRoutes from "./routes/booking.routes";
import hotelRoutes from "./routes/hotel.routes";

const app = express();
app.use(express.json());
app.use("/category", categoryRoutes);
app.use("/login", sessionRoutes);
app.use("/user", userRoutes);
app.use("/pet", petRoutes);
app.use("/admin", adminRoutes);
app.use("/booking", bookingRoutes);
app.use("/hotel", hotelRoutes);

app.use(ErrorMiddleware.handle);

export default app;
