import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetAllSchedulesUseCase } from "./GetAllSchedulesUseCase";

class GetAllSchedulesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const getAllSchedulesUseCase = container.resolve(GetAllSchedulesUseCase);

    const schedules = await getAllSchedulesUseCase.execute();

    return response.json(schedules);
  }
}

export { GetAllSchedulesController };
