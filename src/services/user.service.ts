import { hash } from "bcrypt";
import AppDataSource from "../data-source";
import Address from "../entities/addresses.entities";
import Booking from "../entities/booking.entities";
import Hotel from "../entities/hotel.entities";
import Pets from "../entities/pets.entities";
import User from "../entities/users.entities";
import { AppError } from "../errors/appError";
import {
  IUserCreateRequest,
  IUserUpdateRequest,
} from "../interfaces/interfaces";
import { IUserNoPassword, Utils } from "../utils/functions";

export class UserService {
  static async createUser(user: IUserCreateRequest): Promise<IUserNoPassword> {
    const userRepository = AppDataSource.getRepository(User);
    const addressRepository = AppDataSource.getRepository(Address);

    const transformDateUser = new Date(user.bornDate);
    const dateNow = new Date();

    const age = dateNow.getTime() - transformDateUser.getTime();
    const transformAge = age / 31540000000;

    if (transformAge < 18) {
      throw new AppError("Usuário deve ser maior de idade", 403);
    }

    const validationDataUser = user.hasOwnProperty(
      "name" &&
        "bornDate" &&
        "whatsapp" &&
        "email" &&
        "cpf" &&
        "password" &&
        "address" &&
        "isAdm"
    );

    if (!validationDataUser) {
      throw new AppError("Todos os campos são obrigatórios", 400);
    }

    const findEmailUser = await userRepository.findOneBy({
      email: user.email,
    });
    const findCpfUser = await userRepository.findOneBy({
      cpf: user.cpf,
    });
    const findWhatsappUser = await userRepository.findOneBy({
      whatsapp: user.whatsapp,
    });

    if (findEmailUser) {
      throw new AppError("Email já registrado", 409);
    }
    if (findCpfUser) {
      throw new AppError("	CPF já registrado", 409);
    }
    if (findWhatsappUser) {
      throw new AppError("Whatsapp já registrado", 409);
    }

    const hashedPassword = await hash(user.password, 10);

    const newAddress = addressRepository.create(user.address);
    await addressRepository.save(newAddress);

    const userCreated = userRepository.create({
      name: user.name,
      email: user.email,
      address: newAddress,
      bornDate: user.bornDate,
      cpf: user.cpf,
      isAdm: user.isAdm,
      whatsapp: user.whatsapp,
      password: hashedPassword,
    });

    await userRepository.save(userCreated);

    const userCreatedNoPassword = Utils.removePassword(userCreated);

    return userCreatedNoPassword;
  }

  static async getProfile(id: string): Promise<User> {
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new AppError("Internal erro server");
    }

    return user;
  }

  static async updateUser(
    userData: IUserUpdateRequest,

    idParam: string
  ): Promise<User> {
    const userRepository = AppDataSource.getRepository(User);

    const { bornDate, name, whatsapp, password } = userData;

    const users = await userRepository.find();

    const user = users.find((user) => user.id === idParam);

    const userId = user?.id;

    await userRepository.update(userId!, {
      bornDate,
      name,
      whatsapp,
      password,
    });

    const userUpdated = await userRepository.findOneBy({
      id: userId,
    });

    return userUpdated!;
  }

  static async deleteUser(idUserDelete: string): Promise<void> {
    const userRepository = AppDataSource.getRepository(User);

    const findUser = await userRepository.findOneBy({ id: idUserDelete });

    if (!findUser?.isActive) {
      throw new AppError("Usuario ja foi deletado", 403);
    }

    await userRepository.update(idUserDelete, {
      isActive: false,
    });
  }

  static async profileUser(idUserLogin: string): Promise<User> {
    const userRepository = AppDataSource.getRepository(User);

    const findUser = await userRepository.findOneBy({
      id: idUserLogin,
    });

    return findUser!;
  }

  static async newBooking(
    idUserLogin: string,
    idPet: string,
    idHotel: string,
    bookingDate: string
  ) {
    const petRepository = AppDataSource.getRepository(Pets);
    const userRepository = AppDataSource.getRepository(User);
    const hotelRepository = AppDataSource.getRepository(Hotel);
    const bookingRepository = AppDataSource.getRepository(Booking);

    const pet = await petRepository.findOne({
      where: {
        id: idPet,
      },
      relations: {
        user: true,
      },
    });

    const user = await userRepository.findOne({
      where: {
        id: idUserLogin,
      },
    });

    const hotel = await hotelRepository.findOne({
      where: {
        id: idHotel,
      },
    });

    if (!hotel) {
      throw new AppError("Hotel not found", 400);
    }

    if (pet!.user.id !== user!.id) {
      throw new AppError("You are not pet's tutor", 401);
    }

    if (!pet?.isActive)
      throw new AppError(
        "Não é possível fazer agendamento para um pet inativo",
        400
      );

    const newBooking = bookingRepository.create({
      bookingDate,
      hotel,
      pets: pet!,
    });

    await bookingRepository.save(newBooking);

    return newBooking;
  }

  static async listPetsUser(id: string): Promise<Pets[]> {
    const petsRepository = AppDataSource.getRepository(Pets);

    const pets = await petsRepository.findBy({
      user: {
        id: id,
      },
    });

    return pets;
  }
}
