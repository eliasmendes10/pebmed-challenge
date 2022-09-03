import { NotesRepositoryInMemory } from "@modules/notes/repositories/in-memory/NotesRepositoryInMemory";
import { PatientsRepositoryInMemory } from "@modules/patients/repositories/in-memory/PatientsRepositoryInMemory";
import { CreatePatientUseCase } from "@modules/patients/useCases/createPatient/CreatePatientUseCase";
import { AppError } from "@shared/errors/AppError";
import { CreateNoteUseCase } from "./CreateNoteUseCase";

let createPatientUseCase: CreatePatientUseCase;
let createNoteUseCase: CreateNoteUseCase;
let patientsRepositoryInMemory: PatientsRepositoryInMemory;
let notesRepositoryInMemory: NotesRepositoryInMemory;

describe("Create Note", () => {
  beforeEach(() => {
    notesRepositoryInMemory = new NotesRepositoryInMemory();
    patientsRepositoryInMemory = new PatientsRepositoryInMemory();
    createPatientUseCase = new CreatePatientUseCase(patientsRepositoryInMemory);
    createNoteUseCase = new CreateNoteUseCase(
      notesRepositoryInMemory,
      patientsRepositoryInMemory
    );
  });

  it("Should not be able to create a note for a non-existent patient", async () => {
    const id = "eb63b0ae-00fc-41ac-bc02-aff1ed141d6b";
    expect(async () => {
      await createNoteUseCase.execute({
        note: "Simple text",
        patient_id: id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should be able to create a new note", async () => {
    const patient = await createPatientUseCase.execute({
      name: "Elias Mendes",
      phone_number: "48996412660",
      email: "eliasmdes@gmail.com",
      birth_date: "1990-08-23",
      gender: "Masculino",
      height: 1.8,
      weight: 85,
    });

    const note = await createNoteUseCase.execute({
      note: "Simple text",
      patient_id: patient.id,
    });

    expect(note).toHaveProperty("id");
  });

  it("Should not be able to create a incomplete note ", async () => {
    const patient = await createPatientUseCase.execute({
      name: "Elias Mendes4",
      phone_number: "48996412660",
      email: "eliasmdes@gmail.com",
      birth_date: "1990-08-23",
      gender: "Masculino",
      height: 1.8,
      weight: 85,
    });

    expect(async () => {
      await createNoteUseCase.execute({
        note: "",
        patient_id: patient.id,
      });
    }).rejects.toBeInstanceOf(AppError);

    expect(async () => {
      await createNoteUseCase.execute({
        note: "Simple text",
        patient_id: null,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
