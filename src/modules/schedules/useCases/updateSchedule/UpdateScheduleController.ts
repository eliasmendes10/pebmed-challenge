import { AppError } from "@shared/errors/AppError";
import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateScheduleUseCase } from "./UpdateScheduleUseCase";

class UpdateScheduleController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { time, patient_id } = request.body;

    const updatePatientUseCase = container.resolve(UpdateScheduleUseCase);
    try {
      await updatePatientUseCase.execute({ time, patient_id, id });

      return response.status(204).send();
    } catch (error) {
      throw new AppError(error, 400);
    }
  }
}

export { UpdateScheduleController };
