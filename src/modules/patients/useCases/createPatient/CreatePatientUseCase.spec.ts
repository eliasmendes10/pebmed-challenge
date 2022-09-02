import { PatientsRepositoryInMemory } from "@modules/patients/repositories/in-memory/PatientsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreatePatientUseCase } from "./CreatePatientUseCase";

let createPatientUseCase: CreatePatientUseCase;
let patientsRepositoryInMemory: PatientsRepositoryInMemory;

describe("Create Patient", () => {
  beforeEach(() => {
    patientsRepositoryInMemory = new PatientsRepositoryInMemory();
    createPatientUseCase = new CreatePatientUseCase(patientsRepositoryInMemory);
  });

  it("Should be able to create a new patient", async () => {
    const patient = await createPatientUseCase.execute({
      name: "Elias Mendes4",
      phone_number: "48996412660",
      email: "eliasmdes@gmail.com",
      birth_date: "1990-08-23",
      gender: "Masculino",
      height: 1.8,
      weight: 85,
    });

    expect(patient).toHaveProperty("id");
  });

  it("Should not be able to create a incomplete patient ", async () => {
    expect(async () => {
      await createPatientUseCase.execute({
        name: "",
        phone_number: "48996412660",
        email: "eliasmdes@gmail.com",
        birth_date: "1990-08-23",
        gender: "Masculino",
        height: 1.8,
        weight: 85,
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
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to create a already exists patient", async () => {
    expect(async () => {
      await createPatientUseCase.execute({
        name: "Elias Mendes",
        phone_number: "48996412660",
        email: "eliasmdes@gmail.com",
        birth_date: "1990-08-23",
        gender: "Masculino",
        height: 1.8,
        weight: 85,
      });

      await createPatientUseCase.execute({
        name: "Elias Mendes",
        phone_number: "48996412660",
        email: "eliasmdes@gmail.com",
        birth_date: "1990-08-23",
        gender: "Masculino",
        height: 1.8,
        weight: 85,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to create a incorrect gender", async () => {
    expect(async () => {
      await createPatientUseCase.execute({
        name: "Elias Mendes",
        phone_number: "48996412660",
        email: "eliasmdes@gmail.com",
        birth_date: "1990-08-23",
        gender: "M",
        height: 1.8,
        weight: 85,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Correct gender", async () => {
    const patient1 = await createPatientUseCase.execute({
      name: "Elias Mendes",
      phone_number: "48996412660",
      email: "eliasmdes@gmail.com",
      birth_date: "1990-08-23",
      gender: "Masculino",
      height: 1.8,
      weight: 85,
    });

    expect(patient1).toHaveProperty("id");

    const patient2 = await createPatientUseCase.execute({
      name: "Elias Mendes",
      phone_number: "48996412660",
      email: "eliasmdes2@gmail.com",
      birth_date: "1990-08-23",
      gender: "Feminino",
      height: 1.8,
      weight: 85,
    });

    expect(patient2).toHaveProperty("id");

    const patient3 = await createPatientUseCase.execute({
      name: "Elias Mendes",
      phone_number: "48996412660",
      email: "eliasmdes3@gmail.com",
      birth_date: "1990-08-23",
      gender: "Prefiro não informar",
      height: 1.8,
      weight: 85,
    });

    expect(patient3).toHaveProperty("id");
  });
});
