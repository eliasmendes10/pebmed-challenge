import { PatientsRepositoryInMemory } from "@modules/patients/repositories/in-memory/PatientsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreatePatientUseCase } from "../createPatient/CreatePatientUseCase";
import { ListPatientByIdUseCase } from "../listPatientById/ListPatientByIdUseCase";
import { DeletePatientUseCase } from "./DeletePatientUseCase";

let createPatientUseCase: CreatePatientUseCase;
let deletePatientUseCase: DeletePatientUseCase;
let listPatientByIdUseCase: ListPatientByIdUseCase;
let patientsRepositoryInMemory: PatientsRepositoryInMemory;

describe("Delete Patient", () => {
  beforeEach(() => {
    patientsRepositoryInMemory = new PatientsRepositoryInMemory();
    createPatientUseCase = new CreatePatientUseCase(patientsRepositoryInMemory);
    deletePatientUseCase = new DeletePatientUseCase(patientsRepositoryInMemory);
    listPatientByIdUseCase = new ListPatientByIdUseCase(
      patientsRepositoryInMemory
    );
  });

  it("Should be able to delete a doesn't exists patient", async () => {
    const id = "eb63b0ae-00fc-41ac-bc02-aff1ed141d6b";

    expect(async () => {
      await deletePatientUseCase.execute(id);
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should be able to delete a patient", async () => {
    const patient = await createPatientUseCase.execute({
      name: "Elias Mendes",
      phone_number: "48996412660",
      email: "eliasmdes@gmail.com",
      birth_date: "1990-08-23",
      gender: "Masculino",
      height: 1.8,
      weight: 85,
    });
    const id = patient.id;

    const actualPatient = await listPatientByIdUseCase.execute(id);

    expect(actualPatient).toMatchObject(patient);

    await deletePatientUseCase.execute(id);

    expect(async () => {
      await listPatientByIdUseCase.execute(id);
    }).rejects.toBeInstanceOf(AppError);
  });
});
