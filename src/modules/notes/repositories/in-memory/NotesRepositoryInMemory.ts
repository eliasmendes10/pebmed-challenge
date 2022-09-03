import { INoteDTO } from "@modules/notes/dtos/INoteDTO";
import { Note } from "@modules/notes/infra/typeorm/entities/Note";
import { INotesRepository } from "../INotesRepository";

class NotesRepositoryInMemory implements INotesRepository {
  notes: Note[] = [];

  async create({ note: text, patient_id }: INoteDTO): Promise<Note> {
    const note = new Note();

    Object.assign(note, { note: text, patient_id });

    this.notes.push(note);

    return note;
  }

  async findNoteByPatient(id: string): Promise<Note[]> {
    let selectedNote: Note[] = [];
    this.notes.map((note) => {
      if (note.patient_id === id) {
        selectedNote.push(note);
      }
    });

    return selectedNote;
  }
}

export { NotesRepositoryInMemory };
