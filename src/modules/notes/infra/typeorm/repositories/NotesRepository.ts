import { INoteDTO } from "@modules/notes/dtos/INoteDTO";
import { INotesRepository } from "@modules/notes/repositories/INotesRepository";
import { getRepository, Repository } from "typeorm";
import { Note } from "../entities/Note";
import { validate } from "class-validator";
import { AppError } from "@shared/errors/AppError";

class NotesRepository implements INotesRepository {
  private repository: Repository<Note>;

  constructor() {
    this.repository = getRepository(Note);
  }

  async create(note: INoteDTO): Promise<Note> {
    const errors = await validate(Object.setPrototypeOf(note, new INoteDTO()));

    if (errors.length > 0) {
      throw new AppError(errors);
    }

    const result = this.repository.create(note);

    await this.repository.save(result);
    return result;
  }

  async findNoteByPatient(id: string): Promise<Note[]> {
    return await this.repository.find({
      where: {
        patient_id: id,
      },
      order: {
        created_at: "ASC",
      },
    });
  }
}

export { NotesRepository };
