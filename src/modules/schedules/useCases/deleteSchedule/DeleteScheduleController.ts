import { AppError } from "@shared/errors/AppError";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteScheduleUseCase } from "./DeleteScheduleUseCase";

class DeleteScheduleController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteScheduleUseCase = container.resolve(DeleteScheduleUseCase);
    try {
      const schedule = await deleteScheduleUseCase.execute(id);

      return response.status(200).json(schedule);
    } catch (e) {
      return response.status(e.statusCode).json(e.message);
    }
  }
}

export { DeleteScheduleController };
