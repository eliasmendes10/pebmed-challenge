import { INoteDTO } from "@modules/notes/dtos/INoteDTO";
import { Note } from "@modules/notes/infra/typeorm/entities/Note";
import { INotesRepository } from "@modules/notes/repositories/INotesRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class CreateNoteUseCase {
  constructor(
    @inject("NotesRepository")
    private notesRepository: INotesRepository
  ) {}

  async execute({ note, patient_id }: INoteDTO): Promise<Note> {
    const result = await this.notesRepository.create({
      note,
      patient_id,
    });

    return result;
  }
}

export { CreateNoteUseCase };
