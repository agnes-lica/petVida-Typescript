import AppDataSource from "../data-source";
import Category from "../entities/categories.entities";
import { AppError } from "../errors/appError";
import { ICategoryRequest } from "../interfaces/categories.interfaces";

 export class CategoryService {
    static async createCategory({ name }: ICategoryRequest ) : Promise<Category>{

    const categoryRepository = AppDataSource.getRepository(Category)

    const categories = await categoryRepository.find()

    const categoryAlreadyExists = categories.find((category) => category.name === name)

    if(categoryAlreadyExists) {
        throw new AppError("essa categoria já existe", 400)
    }

    const category = categoryRepository.create({
        name
    })

    await categoryRepository.save(category)

    return category
    }
}