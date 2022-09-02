import { PatientsRepositoryInMemory } from "@modules/patients/repositories/in-memory/PatientsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreatePatientUseCase } from "../createPatient/CreatePatientUseCase";
import { ListPatientByIdUseCase } from "../listPatientById/ListPatientByIdUseCase";
import { UpdatePatientUseCase } from "./UpdatePatientUseCase";

let createPatientUseCase: CreatePatientUseCase;
let updatePatientUseCase: UpdatePatientUseCase;
let listPatientByIdUseCase: ListPatientByIdUseCase;
let patientsRepositoryInMemory: PatientsRepositoryInMemory;

describe("Update Patient", () => {
  beforeEach(() => {
    patientsRepositoryInMemory = new PatientsRepositoryInMemory();
    createPatientUseCase = new CreatePatientUseCase(patientsRepositoryInMemory);
    updatePatientUseCase = new UpdatePatientUseCase(patientsRepositoryInMemory);
    listPatientByIdUseCase = new ListPatientByIdUseCase(
      patientsRepositoryInMemory
    );
  });

  it("Should be able to update a non-existent patient", async () => {
    const id = "eb63b0ae-00fc-41ac-bc02-aff1ed141d6b";

    expect(async () => {
      await updatePatientUseCase.execute({
        name: "Elias Mendes",
        phone_number: "48996412660",
        email: "changemail@gmail.com",
        birth_date: "1990-08-23",
        gender: "Masculino",
        height: 1.8,
        weight: 85,
        id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
  it("Should be able to update a patient", async () => {
    const patient = await createPatientUseCase.execute({
      name: "Elias Mendes4",
      phone_number: "48996412660",
      email: "eliasmdes@gmail.com",
      birth_date: "1990-08-23",
      gender: "Masculino",
      height: 1.8,
      weight: 85,
    });
    const id = patient.id;

    const changePatient = {
      name: "Elias Mendes",
      phone_number: "48996412660",
      email: "changemail@gmail.com",
      birth_date: "1990-08-23",
      gender: "Masculino",
      height: 1.8,
      weight: 85,
      id,
    };

    await updatePatientUseCase.execute(changePatient);
    const actualPatient = await listPatientByIdUseCase.execute(id);

    expect(actualPatient).toMatchObject(changePatient);
  });

  it("Should not be able to update a incomplete patient ", async () => {
    const patient = await createPatientUseCase.execute({
      name: "Elias Mendes4",
      phone_number: "48996412660",
      email: "eliasmdes@gmail.com",
      birth_date: "1990-08-23",
      gender: "Masculino",
      height: 1.8,
      weight: 85,
    });
    const id = patient.id;

    expect(async () => {
      await createPatientUseCase.execute({
        name: "",
        phone_number: "48996412660",
        email: "eliasmdes@gmail.com",
        birth_date: "1990-08-23",
        gender: "Masculino",
        height: 1.8,
        weight: 85,
        id,
      });
    }).rejects.toBeInstanceOf(AppError);

    expect(async () => {
      await createPatientUseCase.execute({
        name: "Elias Mendes",
        phone_number: "",
        email: "eliasmdes@gmail.com",
        birth_date: "1990-08-23",
        gender: "Masculino",
        height: 1.8,
        weight: 85,
        id,
      });
    }).rejects.toBeInstanceOf(AppError);

    expect(async () => {
      await createPatientUseCase.execute({
        name: "Elias Mendes",
        phone_number: "48996412660",
        email: "",
        birth_date: "1990-08-23",
        gender: "Masculino",
        height: 1.8,
        weight: 85,
        id,
      });
    }).rejects.toBeInstanceOf(AppError);

    expect(async () => {
      await createPatientUseCase.execute({
        name: "Elias Mendes",
        phone_number: "48996412660",
        email: "eliasmdes@gmail.com",
        birth_date: "",
        gender: "Masculino",
        height: 1.8,
        weight: 85,
        id,
      });
    }).rejects.toBeInstanceOf(AppError);

    expect(async () => {
      await createPatientUseCase.execute({
        name: "Elias Mendes",
        phone_number: "48996412660",
        email: "eliasmdes@gmail.com",
        birth_date: "1990-08-23",
        gender: "",
        height: 1.8,
        weight: 85,
        id,
      });
    }).rejects.toBeInstanceOf(AppError);

    expect(async () => {
      await createPatientUseCase.execute({
        name: "Elias Mendes",
        phone_number: "48996412660",
        email: "eliasmdes@gmail.com",
        birth_date: "1990-08-23",
        gender: "Masculino",
        height: null,
        weight: 85,
        id,
      });
    }).rejects.toBeInstanceOf(AppError);

    expect(async () => {
      await createPatientUseCase.execute({
        name: "Elias Mendes",
        phone_number: "48996412660",
        email: "eliasmdes@gmail.com",
        birth_date: "1990-08-23",
        gender: "Masculino",
        height: 1.8,
        weight: null,
        id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
