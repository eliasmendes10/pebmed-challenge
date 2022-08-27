import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreatePatientUseCase } from "./CreatePatientUseCase";

class CreatePatientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, phone_number, email, birth_date, gender, height, weight } =
      request.body;

    const createPatientUseCase = container.resolve(CreatePatientUseCase);

    const patient = await createPatientUseCase.execute({
      name,
      phone_number,
      email,
      birth_date,
      gender,
      height,
      weight,
    });

    return response.status(201).json(patient);
  }
}

export { CreatePatientController };
