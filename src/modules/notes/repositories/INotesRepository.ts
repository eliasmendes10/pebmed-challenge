import { INoteDTO } from "../dtos/INoteDTO";
import { Note } from "../infra/typeorm/entities/Note";

interface INotesRepository {
  create(data: INoteDTO): Promise<Note>;
  findNoteByPatient(id: string): Promise<Note[]>;
}

export { INotesRepository };
