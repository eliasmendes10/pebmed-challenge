import { AppError } from "@shared/errors/AppError";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateScheduleUseCase } from "./CreateScheduleUseCase";

class CreateScheduleController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { time, patient_id } = request.body;

    const createScheduleUseCase = container.resolve(CreateScheduleUseCase);
    try {
      const schedule = await createScheduleUseCase.execute({
        time,
        patient_id,
      });

      return response.status(201).json(schedule);
    } catch (e) {
      return response.status(e.statusCode).json(e.message);
    }
  }
}

export { CreateScheduleController };
