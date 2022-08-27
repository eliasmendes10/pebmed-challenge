import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetAllPatientsUseCase } from "./GetAllPatientsUseCase";

class GetAllPatientsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const getAllPatientsUseCase = container.resolve(GetAllPatientsUseCase);

    const patients = await getAllPatientsUseCase.execute();

    return response.json(patients);
  }
}

export { GetAllPatientsController };
