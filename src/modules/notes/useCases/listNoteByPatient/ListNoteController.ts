import { AppError } from "@shared/errors/AppError";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListNoteUseCase } from "./ListNoteUseCase";

class ListNoteController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const listNoteUseCase = container.resolve(ListNoteUseCase);
    try {
      const notes = await listNoteUseCase.execute(id);

      return response.status(200).json(notes);
    } catch (error) {
      throw new AppError("Notes doesn't exist!", 404);
    }
  }
}

export { ListNoteController };
