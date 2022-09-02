import { AppError } from "@shared/errors/AppError";
import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdatePatientUseCase } from "./UpdatePatientUseCase";

class UpdatePatientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const { name, phone_number, email, birth_date, gender, height, weight } =
      request.body;

    const updatePatientUseCase = container.resolve(UpdatePatientUseCase);
    try {
      await updatePatientUseCase.execute({
        name,
        phone_number,
        email,
        birth_date,
        gender,
        height,
        weight,
        id,
      });

      return response.status(204).send();
    } catch (e) {
      return response.status(e.statusCode).json(e.message);
    }
  }
}

export { UpdatePatientController };
