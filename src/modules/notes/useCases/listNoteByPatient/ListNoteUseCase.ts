import { inject, injectable } from "tsyringe";

import { Note } from "@modules/notes/infra/typeorm/entities/Note";
import { INotesRepository } from "@modules/notes/repositories/INotesRepository";
import { AppError } from "@shared/errors/AppError";
import { IPatientsRepository } from "@modules/patients/repositories/IPatientsRepository";

@injectable()
class ListNoteUseCase {
  constructor(
    @inject("NotesRepository")
    private notesRepository: INotesRepository,
    @inject("PatientsRepository")
    private patientsRepository: IPatientsRepository
  ) {}

  public async execute(id: string): Promise<Note[]> {
    const patient = await this.patientsRepository.findById(id);

    if (!patient) {
      throw new AppError({ error: "Patient doesn't exists" }, 400);
    }
    return await this.notesRepository.findNoteByPatient(id);
  }
}

export { ListNoteUseCase };
