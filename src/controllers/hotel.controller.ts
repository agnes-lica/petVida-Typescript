import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { IHotelUpdateRequest } from "../interfaces/interfaces";
import { HotelService } from "../services/hotel.service";

export class HotelController {
  static async listHospPets(req: Request, res: Response) {
    const hotelId: string = req.params.idHotel;
    const listPets = await HotelService.lisHosptPets(hotelId!);

    return res.status(200).json(listPets);
  }

  static async updateHotel(req: Request, res: Response) {
    const hotelId: string = req.params.idHotel;
    const hotelData: IHotelUpdateRequest = req.body;

    const updatedHotel = await HotelService.updateHotel(hotelId, hotelData);
    return res.status(200).json(instanceToPlain(updatedHotel));
  }
  static async delete(req: Request, res: Response) {
    const hotelId: string = req.params.idHotel;
    await HotelService.deleteHotel(hotelId);
    return res.status(204).json();
  }

  static async getBookings(req: Request, res: Response) {
    const hotelId: string = req.params.idHotel;

    const bookings = await HotelService.getHotelBookings(hotelId);
    return res.status(200).json(bookings);
  }
}
