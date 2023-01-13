import {
  IHotelCreateRequest,
  IHotelUpdateRequest,
} from "./../interfaces/interfaces";
import { Request, Response } from "express";
import { adminService } from "../services/admin.service";
import { ICategoryRequest } from "../interfaces/categories.interfaces";
import { instanceToPlain } from "class-transformer";

class adminController {
  static async createHotel(req: Request, res: Response) {
    const hotelData: IHotelCreateRequest = req.body;
    const newhotel = await adminService.createHotel(hotelData);

    return res.status(201).json(instanceToPlain(newhotel));
  }

  static async getHotels(req: Request, res: Response) {
    const hotelList = await adminService.getHotels();

    return res.status(200).json(hotelList);
  }

  static async deleteHotel(req: Request, res: Response) {
    const hotelId: string = req.params.idHotel;

    await adminService.deleteHotel(hotelId);

    return res.status(204).json({ message: "Hotel deletado!" });
  }

  static async updateHotel(req: Request, res: Response) {
    const hotelId: string = req.params.idHotel;
    const hotelData: IHotelUpdateRequest = req.body;

    const updatedHotel = await adminService.updateHotel(hotelId, hotelData);
    return res.status(200).json(instanceToPlain(updatedHotel));
  }

  static async createCategory(req: Request, res: Response) {
    const category: ICategoryRequest = req.body;

    const newCategory = await adminService.createCategory(category);

    return res.status(201).json(newCategory);
  }

  static async listAllUsers(req: Request, res: Response) {
    const listUsers = await adminService.listAllusers();

    return res.status(200).json(instanceToPlain(listUsers));
  }

  static async listAllPets(req: Request, res: Response) {
    const listPets = await adminService.listAllPets();

    return res.status(200).json(listPets);
  }
  static async listAllCategories(req: Request, res: Response) {
    const listCategory = await adminService.listAllCategories();
    return res.status(200).json(listCategory);
  }

  static async listAllBookings(req: Request, res: Response) {
    const listBookings = await adminService.listAllBookings();

    return res.status(200).json(listBookings);
  }
}

export default adminController;
