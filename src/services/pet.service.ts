import AppDataSource from "../data-source";
import Booking from "../entities/booking.entities";
import Category from "../entities/categories.entities";
import Pets from "../entities/pets.entities";
import User from "../entities/users.entities";
import { AppError } from "../errors/appError";
import {
  IPetCreateRequest,
  IPetUpdateRequest,
} from "../interfaces/pet.interfaces";

export class PetService {
  static async create(data: IPetCreateRequest): Promise<Pets> {
    const petRepository = AppDataSource.getRepository(Pets);
    const userRepository = AppDataSource.getRepository(User);
    const categoryRepository = AppDataSource.getRepository(Category);

    if (!data.userId || !data.categoryId || !data.name)
      throw new AppError("Todos os campos são obrigatórios", 400);

    const user = await userRepository.findOneBy({ id: data.userId });
    if (!user) throw new AppError("Usuário não encontrada", 400);

    const category = await categoryRepository.findOneBy({
      id: data.categoryId,
    });
    if (!category) throw new AppError("Categoria não encontrada", 400);

    const newPet = petRepository.create({
      name: data.name,
      user: user,
      category: category,
    });

    await petRepository.save(newPet);

    return newPet;
  }

  static async update(data: IPetUpdateRequest, id: string): Promise<Pets> {
    const { name, categoryId, userId } = data;

    const petRepository = AppDataSource.getRepository(Pets);
    const userRepository = AppDataSource.getRepository(User);
    const categoryRepository = AppDataSource.getRepository(Category);

    const user = await userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new AppError("User not found", 403);
    }

    const category = await categoryRepository.findOne({
      where: {
        id: categoryId,
      },
    });

    if (!category) {
      throw new AppError("Category not found", 403);
    }

    await petRepository.update(id, { name, user, category });

    const updatedPet = await petRepository.findOneBy({ id });

    return updatedPet!;
  }

  static async listById(idPet: string): Promise<Pets> {
    const petRepository = AppDataSource.getRepository(Pets);

    const pet = await petRepository.findOne({
      where: {
        id: idPet,
      },
      relations: {
        category: true,
      },
    });

    if (!pet) throw new AppError("Pet não encontrado", 400);

    return pet;
  }

  static async listBookingPet (id: string): Promise<Booking> {

    const bookingRepository = AppDataSource.getRepository(Booking)
    const booking = await bookingRepository.findOneBy({id})
    
    const petBooking = await bookingRepository.findOneBy({
      pets: {
        id: booking?.pets.id
      }
    })

    if(!petBooking) {
        throw new AppError("Não há agendamentos para este pet", 400)
    }

    return petBooking;
  }

  static async delete(id: string) {
    const petRepository = AppDataSource.getRepository(Pets);

    const pet = await petRepository.findOneBy({ id });

    if (!pet) throw new AppError("Pet não encontrado", 400);

    if (pet.isActive === false) throw new AppError("Pet já está inativo", 400);

    await petRepository.update(id, {
      isActive: false,
    });
  }
}
