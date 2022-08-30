import { AppError } from "@shared/errors/AppError";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeletePatientUseCase } from "./DeletePatientUseCase";

class DeletePatientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deletePatientUseCase = container.resolve(DeletePatientUseCase);
    try {
      const patient = await deletePatientUseCase.execute(id);

      return response.status(200).json(patient);
    } catch (error) {
      throw new AppError("Patient doesn't exist!", 404);
    }
  }
}

export { DeletePatientController };
