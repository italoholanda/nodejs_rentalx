import { Request, Response } from "express";
import { container } from "tsyringe";

import { UploadCarImagesUseCase } from "./uploadCarImagesUseCase";

interface IFiles {
  filename: string;
}

class UploadCarImagesController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const images = request.files as IFiles[];

    const uploadCarImagesUseCase = container.resolve(UploadCarImagesUseCase);

    const images_name = images?.map((file) => file.filename);

    await uploadCarImagesUseCase.execute({ images_name, car_id: id });

    return response.status(201).send();
  }
}

export { UploadCarImagesController };
