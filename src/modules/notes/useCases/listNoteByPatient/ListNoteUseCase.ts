import { inject, injectable } from "tsyringe";

import { Note } from "@modules/notes/infra/typeorm/entities/Note";
import { INotesRepository } from "@modules/notes/repositories/INotesRepository";

@injectable()
class ListNoteUseCase {
  constructor(
    @inject("NotesRepository")
    private notesRepository: INotesRepository
  ) {}

  public async execute(id: string): Promise<Note[]> {
    return await this.notesRepository.findNoteByPatient(id);
  }
}

export { ListNoteUseCase };
