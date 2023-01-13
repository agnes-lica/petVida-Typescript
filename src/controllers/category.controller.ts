import { Request, Response } from "express";
import { ICategoryRequest } from "../interfaces/categories.interfaces";
import { CategoryService } from "../services/category.service";

export class CategoryController {
  static async createCategory(req: Request, res: Response) {
    const name: ICategoryRequest = req.body;
    const category = await CategoryService.createCategory(name);

    return res.status(201).json(category);
  }
}
