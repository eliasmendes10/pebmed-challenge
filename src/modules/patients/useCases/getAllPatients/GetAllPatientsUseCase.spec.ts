import { PatientsRepositoryInMemory } from "@modules/patients/repositories/in-memory/PatientsRepositoryInMemory";
import { CreatePatientUseCase } from "../createPatient/CreatePatientUseCase";
import { GetAllPatientsUseCase } from "./GetAllPatientsUseCase";

let createPatientUseCase: CreatePatientUseCase;
let getAllPatientsUseCase: GetAllPatientsUseCase;
let patientsRepositoryInMemory: PatientsRepositoryInMemory;

describe("List Patient", () => {
  beforeEach(() => {
    patientsRepositoryInMemory = new PatientsRepositoryInMemory();
    createPatientUseCase = new CreatePatientUseCase(patientsRepositoryInMemory);
    getAllPatientsUseCase = new GetAllPatientsUseCase(
      patientsRepositoryInMemory
    );
  });

  it("Should be able to list all patient", async () => {
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
      email: "eliasmdes2@gmail.com",
      birth_date: "1990-08-23",
      gender: "Masculino",
      height: 1.8,
      weight: 85,
    });

    await createPatientUseCase.execute({
      name: "Elias Mendes",
      phone_number: "48996412660",
      email: "eliasmdes3@gmail.com",
      birth_date: "1990-08-23",
      gender: "Masculino",
      height: 1.8,
      weight: 85,
    });

    const actualPatient = await getAllPatientsUseCase.execute();

    expect(actualPatient).toHaveLength(3);
  });
});
