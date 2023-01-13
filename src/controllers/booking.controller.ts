import { Request, Response } from "express";
import { BookingService } from "../services/booking.service";

export class BookingController {
  static async confirm(req: Request, res: Response) {
    const id = req.params.idBooking;

    await BookingService.confirm(id);

    return res.status(200).json({ message: "Reserva confirmada" });
  }

  static async deleteBooking(req: Request, res: Response) {
    const id = req.params.idBooking;

    await BookingService.deleteBooking(id);

    return res.status(204).json({});
  }

  static async checkin(req: Request, res: Response) {
    const id = req.params.idBooking;
    await BookingService.checkin(id);

    return res.status(200).json({ message: "Checkin Realizado como Sucesso" });
  }

  static async cancelConfirmBooking(req: Request, res: Response) {
    const id: string = req.params.idBooking;

    await BookingService.cancelConfirmBooking(id);

    return res.status(204).json({ message: "Reserva desconfirmada" });
  }

  static async checkout(req: Request, res: Response) {
    const id = req.params.idBooking;
    await BookingService.checkout(id);

    return res.status(200).json({ message: "Checkout Realizado como Sucesso" });
  }

  static async getAllbookingConfirmed(req: Request, res: Response) {
    const id = req.params.idBooking;

    const bookingList = await BookingService.getAllConfirmedBooking(id);

    return res.status(200).json(bookingList);
  }
  static async getOnebookingConfirmed(req: Request, res: Response) {
    const { idHotel, idBooking } = req.params;

    const bookingList = await BookingService.getOneConfirmedBooking(
      idHotel,
      idBooking
    );

    return res.status(200).json(bookingList);
  }
}
