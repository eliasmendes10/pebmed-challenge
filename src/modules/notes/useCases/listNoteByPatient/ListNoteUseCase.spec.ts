import { NotesRepositoryInMemory } from "@modules/notes/repositories/in-memory/NotesRepositoryInMemory";
import { PatientsRepositoryInMemory } from "@modules/patients/repositories/in-memory/PatientsRepositoryInMemory";
import { CreatePatientUseCase } from "@modules/patients/useCases/createPatient/CreatePatientUseCase";
import { AppError } from "@shared/errors/AppError";
import { CreateNoteUseCase } from "../createNote/CreateNoteUseCase";
import { ListNoteUseCase } from "./ListNoteUseCase";

let createPatientUseCase: CreatePatientUseCase;
let createNoteUseCase: CreateNoteUseCase;
let listNoteUseCase: ListNoteUseCase;
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
    listNoteUseCase = new ListNoteUseCase(
      notesRepositoryInMemory,
      patientsRepositoryInMemory
    );
  });

  it("Should not be able to list notes for a non-existent patient", async () => {
    const id = "eb63b0ae-00fc-41ac-bc02-aff1ed141d6b";
    expect(async () => {
      await listNoteUseCase.execute(id);
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should be able to list notes for a specific patient", async () => {
    const patient = await createPatientUseCase.execute({
      name: "Elias Mendes",
      phone_number: "48996412660",
      email: "eliasmdes@gmail.com",
      birth_date: "1990-08-23",
      gender: "Masculino",
      height: 180,
      weight: 85,
    });

    await createNoteUseCase.execute({
      note: "Simple text 1",
      patient_id: patient.id,
    });

    await createNoteUseCase.execute({
      note: "Simple text 2",
      patient_id: patient.id,
    });

    await createNoteUseCase.execute({
      note: "Simple text 3",
      patient_id: patient.id,
    });

    const notes = await listNoteUseCase.execute(patient.id);

    expect(notes).toHaveLength(3);
  });
});
