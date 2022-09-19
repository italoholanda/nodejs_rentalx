import { Request, Response } from "express";

import ListCategoriesUseCase from "./ListCategoriesUseCase";

export default class ListCategoriesController {
  constructor(private listCategoriesUseCase: ListCategoriesUseCase) {
    this.listCategoriesUseCase = listCategoriesUseCase;
  }

  handle(request: Request, response: Response) {
    try {
      const categoriesList = this.listCategoriesUseCase.execute();
      return response.status(200).json(categoriesList);
    } catch (err) {
      throw new Error(err.message);
    }
  }
}