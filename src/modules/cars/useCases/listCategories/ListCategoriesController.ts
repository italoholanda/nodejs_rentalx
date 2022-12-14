import { Request, Response } from "express";
import { container } from "tsyringe";

import ListCategoriesUseCase from "./ListCategoriesUseCase";

export default class ListCategoriesController {
  async handle(request: Request, response: Response) {
    const listCategoriesUseCase = container.resolve(ListCategoriesUseCase);
    const categoriesList = await listCategoriesUseCase.execute();

    return response.json(categoriesList);
  }
}
