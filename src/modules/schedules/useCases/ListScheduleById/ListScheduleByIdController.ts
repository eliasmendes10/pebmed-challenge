import { AppError } from "@shared/errors/AppError";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListScheduleByIdUseCase } from "./ListScheduleByIdUseCase";

class ListScheduleByIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const listScheduleByIdUseCase = container.resolve(ListScheduleByIdUseCase);
    try {
      const schedule = await listScheduleByIdUseCase.execute(id);
      return response.status(200).json(schedule);
    } catch (error) {
      throw new AppError("Schedule doesn't exist!", 404);
    }
  }
}

export { ListScheduleByIdController };
