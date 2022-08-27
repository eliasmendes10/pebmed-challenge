import { AppError } from "@shared/errors/AppError";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListPatientByIdUseCase } from "./ListPatientByIdUseCase";

class ListPatientByIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const listPatientByIdUseCase = container.resolve(ListPatientByIdUseCase);
    try {
      const patient = await listPatientByIdUseCase.execute(id);

      return response.status(201).json(patient);
    } catch (error) {
      throw new AppError("Patient doesn't exist!", 404);
    }
  }
}

export { ListPatientByIdController };
