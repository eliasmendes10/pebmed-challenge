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

      return response.status(200).json(patient);
    } catch (e) {
      return response.status(e.statusCode).json(e.message);
    }
  }
}

export { ListPatientByIdController };
