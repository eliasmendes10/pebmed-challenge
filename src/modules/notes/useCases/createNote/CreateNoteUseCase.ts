import { INoteDTO } from "@modules/notes/dtos/INoteDTO";
import { Note } from "@modules/notes/infra/typeorm/entities/Note";
import { INotesRepository } from "@modules/notes/repositories/INotesRepository";
import { IPatientsRepository } from "@modules/patients/repositories/IPatientsRepository";
import { AppError } from "@shared/errors/AppError";
import { CreateNoteValidationModel } from "@shared/validation/validationModels/note/createNoteValidation.model";
import { Validator } from "@shared/validation/validator";
import { inject, injectable } from "tsyringe";

@injectable()
class CreateNoteUseCase {
  constructor(
    @inject("NotesRepository")
    private notesRepository: INotesRepository,
    @inject("PatientsRepository")
    private patientsRepository: IPatientsRepository
  ) {}

  async execute({ note, patient_id }: INoteDTO): Promise<Note> {
    const validator = new Validator();

    const validationErrors = await validator.validate(
      { note, patient_id },
      CreateNoteValidationModel,
      false
    );

    if (validationErrors) {
      throw new AppError({ error: validationErrors.errors }, 400);
    }

    const patient = await this.patientsRepository.findById(patient_id);

    if (!patient) {
      throw new AppError({ error: "Patient doesn't exists" }, 400);
    }

    const result = await this.notesRepository.create({
      note,
      patient_id,
    });

    return result;
  }
}

export { CreateNoteUseCase };
