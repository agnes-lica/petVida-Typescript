import { Request, Response } from "express";
import {
  IPetCreateRequest,
  IPetUpdateRequest,
} from "../interfaces/pet.interfaces";
import { PetService } from "../services/pet.service";

export class PetController {
  static async create(req: Request, res: Response) {
    const petData: IPetCreateRequest = {
      categoryId: req.body.categoryId,
      userId: req.user.id!,
      name: req.body.name,
    };

    const newPet = await PetService.create(petData);

    return res.status(201).json(newPet);
  }

  static async update(req: Request, res: Response) {
    const petData: IPetUpdateRequest = req.body;
    const idPet = req.params.idPet;
    const updatedPet = await PetService.update(petData, idPet);

    return res.status(200).json(updatedPet);
  }

  static async listById(req: Request, res: Response) {
    const idPet = req.params.idPet;
    const petInfo = await PetService.listById(idPet);

    return res.status(200).json(petInfo);
  }

  static async listBooking(req: Request, res: Response) {
    const petId = req.params.idPet;

    const bookingPet = await PetService.listBookingPet(petId);

    return res.status(200).json(bookingPet);
  }

  static async delete(req: Request, res: Response) {
    const idPet = req.params.idPet;
    await PetService.delete(idPet);

    res.status(204).json();
  }
}
