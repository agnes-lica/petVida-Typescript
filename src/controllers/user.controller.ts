import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { instanceToPlain } from "class-transformer";
import {
  IUserCreateRequest,
  IUserUpdateRequest,
} from "../interfaces/interfaces";

export class UserController {
  static async createUser(request: Request, response: Response) {
    const user: IUserCreateRequest = request.body;

    const userCreated = await UserService.createUser(user);

    //console.log("sem a senha", userCreated)
    return response.status(201).json(instanceToPlain(userCreated));
  }

  static async profile(request: Request, response: Response) {
    const id = request.user.id!;

    const user = await UserService.getProfile(id);

    return response.status(200).json(instanceToPlain(user));
  }

  static async updateUser(request: Request, response: Response) {
    const userData: IUserUpdateRequest = request.body;
    const idParam = request.params.id;
    const userUpdated = await UserService.updateUser(userData, idParam);
    return response.status(200).json(instanceToPlain(userUpdated));
  }

  static async deleteUser(request: Request, response: Response) {
    const idUserDelete = request.params.id;
    await UserService.deleteUser(idUserDelete);
    return response.status(204).json();
  }

  static async newBooking(request: Request, response: Response) {
    const idUserLogin = request.user.id!;
    const { idPet } = request.params;
    const { idHotel, bookingDate } = request.body;

    const newBooking = await UserService.newBooking(
      idUserLogin,
      idPet,
      idHotel,
      bookingDate
    );

    return response.status(201).json(instanceToPlain(newBooking));
  }

  static async profileUser(request: Request, response: Response) {
    const idUserLogin = request.user.id;
    const profile = await UserService.profileUser(idUserLogin!);
    return response.status(200).json(instanceToPlain(profile));
  }

  static async listPets(req: Request, res: Response) {
    const id = req.params.id;
    const pets = await UserService.listPetsUser(id);

    return res.status(200).json(instanceToPlain(pets));
  }
}
