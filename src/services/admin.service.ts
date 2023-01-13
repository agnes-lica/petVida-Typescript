import { IHotelUpdateRequest } from "./../interfaces/interfaces";
import AppDataSource from "../data-source";
import Hotel from "../entities/hotel.entities";
import User from "../entities/users.entities";
import { AppError } from "../errors/appError";
import { IHotelCreateRequest } from "../interfaces/interfaces";
import Address from "../entities/addresses.entities";
import Category from "../entities/categories.entities";
import Pets from "../entities/pets.entities";
import { ICategoryRequest } from "../interfaces/categories.interfaces";
import Booking from "../entities/booking.entities";

export class adminService {
  static async createHotel(data: IHotelCreateRequest): Promise<Hotel> {
    const hotelRepository = AppDataSource.getRepository(Hotel);
    const adressRepository = AppDataSource.getRepository(Address);
    const userRepository = AppDataSource.getRepository(User);

    const {
      capacity,
      cnpj,
      corporateName,
      fantasyName,
      email,
      whatsapp,
      managerId,
      address,
    } = data;

    if (!managerId) {
      throw new AppError("ManagerId is required", 400);
    }

    const findFantasyName = await hotelRepository.findOneBy({
      fantasyName: data.fantasyName,
    });
    const findCorporateName = await hotelRepository.findOneBy({
      corporateName: data.corporateName,
    });

    const findWhatsapp = await hotelRepository.findOneBy({
      whatsapp: data.whatsapp,
    });
    const findEmail = await hotelRepository.findOneBy({
      email: data.email,
    });

    const CNPJRegex = /[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2}/;

    if (!data.cnpj.match(CNPJRegex)) {
      throw new AppError("CNPJ inválido.", 400);
    }

    if (findCorporateName) {
      throw new AppError("Já existe um hotel com esse nome", 400);
    }

    if (findFantasyName) {
      throw new AppError("Já existe um hotel com esse nome", 400);
    }

    if (findWhatsapp) {
      throw new AppError(
        "Esse número de whatsapp já está sendo utilizado",
        400
      );
    }

    if (findEmail) {
      throw new AppError("Esse endereço de email já está sendo utilizado", 400);
    }

    const newAddress = adressRepository.create(address);
    await adressRepository.save(newAddress);

    const manager = await userRepository.findOne({
      where: {
        id: managerId,
      },
    });

    if (!manager) {
      throw new AppError("Manager not found", 400);
    }

    const newHotel = hotelRepository.create({
      capacity,
      cnpj,
      corporateName,
      fantasyName,
      email,
      whatsapp,
      address: newAddress,
      manager,
    });

    await hotelRepository.save(newHotel);

    return newHotel;
  }

  static async getHotels(): Promise<Hotel[]> {
    const hotelRepository = AppDataSource.getRepository(Hotel);
    const hotelList = hotelRepository.find({
      relations: {
        manager: true,
      },
    });

    if (!hotelList) {
      throw new AppError("Nenhum hotel foi encontrado", 404);
    }
    return hotelList;
  }

  static async deleteHotel(hotelId: string): Promise<void> {
    const hotelRepository = AppDataSource.getRepository(Hotel);

    const findHotel = await hotelRepository.findOneBy({ id: hotelId });

    if (findHotel!.isActive === false) {
      throw new AppError("Hotel já está inativo", 400);
    }
    await hotelRepository.update(hotelId, { isActive: false });
  }

  static async updateHotel(
    hotelId: string,
    data: IHotelUpdateRequest
  ): Promise<Hotel> {
    const hotelRepository = AppDataSource.getRepository(Hotel);

    const hotel = await hotelRepository.findOneBy({ id: hotelId });

    await hotelRepository.update(hotelId, data);

    const updatedHotel = await hotelRepository.findOneBy({ id: hotelId });

    return updatedHotel!;
  }

  static async createCategory(data: ICategoryRequest): Promise<Category> {
    const categoryRepository = AppDataSource.getRepository(Category);

    const findCategory = await categoryRepository.findOneBy({
      name: data.name,
    });

    if (findCategory) {
      throw new AppError("Essa categoria já existe", 400);
    }

    const newCategory = categoryRepository.create({
      name: data.name,
    });

    await categoryRepository.save(newCategory);

    return newCategory;
  }

  static async listAllusers(): Promise<User[]> {
    const userRepository = AppDataSource.getRepository(User);

    const listUsers = await userRepository.find();

    return listUsers;
  }

  static async listAllPets(): Promise<Pets[]> {
    const petsRepository = AppDataSource.getRepository(Pets);

    const listPets = await petsRepository.find({
      relations: {
        user: true,
      },
    });

    return listPets;
  }

  static async listAllCategories(): Promise<Category[]> {
    const categoryRepository = AppDataSource.getRepository(Category);

    const listCategories = await categoryRepository.find();

    return listCategories;
  }
  static async listAllBookings(): Promise<Booking[]> {
    const bookingRepository = AppDataSource.getRepository(Booking);

    const bookingCategories = await bookingRepository.find();

    return bookingCategories;
  }
}
