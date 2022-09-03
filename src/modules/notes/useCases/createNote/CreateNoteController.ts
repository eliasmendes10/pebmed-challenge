import { AppError } from "@shared/errors/AppError";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateNoteUseCase } from "./CreateNoteUseCase";

class CreateNoteController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { note, patient_id } = request.body;

    const createNoteUseCase = container.resolve(CreateNoteUseCase);
    try {
      const result = await createNoteUseCase.execute({
        note,
        patient_id,
      });

      return response.status(201).json(result);
    } catch (e) {
      return response.status(e.statusCode).json(e.message);
    }
  }
}

export { CreateNoteController };
