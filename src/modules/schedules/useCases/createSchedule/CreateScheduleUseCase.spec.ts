import { SchedulesRepositoryInMemory } from "@modules/schedules/repositories/in-memory/SchedulesRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateScheduleUseCase } from "./CreateScheduleUseCase";
import { CreatePatientUseCase } from "@modules/patients/useCases/createPatient/CreatePatientUseCase";
import { PatientsRepositoryInMemory } from "@modules/patients/repositories/in-memory/PatientsRepositoryInMemory";

let createPatientUseCase: CreatePatientUseCase;
let patientsRepositoryInMemory: PatientsRepositoryInMemory;

let createScheduleUseCase: CreateScheduleUseCase;
let schedulesRepositoryInMemory: SchedulesRepositoryInMemory;

describe("Create Schedule", () => {
  beforeEach(() => {
    patientsRepositoryInMemory = new PatientsRepositoryInMemory();
    schedulesRepositoryInMemory = new SchedulesRepositoryInMemory();

    createPatientUseCase = new CreatePatientUseCase(patientsRepositoryInMemory);
    createScheduleUseCase = new CreateScheduleUseCase(
      schedulesRepositoryInMemory,
      patientsRepositoryInMemory
    );
  });

  it("Should be able to create a new schedule", async () => {
    const patient = await createPatientUseCase.execute({
      name: "Elias Mendes4",
      phone_number: "48996412660",
      email: "eliasmdes@gmail.com",
      birth_date: "1990-08-23",
      gender: "Masculino",
      height: 1.8,
      weight: 85,
    });

    const schedule = await createScheduleUseCase.execute({
      time: "2022-09-21 19:30:00",
      patient_id: patient.id,
    });

    expect(schedule).toHaveProperty("id");
  });

  it("Should not be able to create a schedule at the same time", async () => {
    const patient = await createPatientUseCase.execute({
      name: "Elias Mendes4",
      phone_number: "48996412660",
      email: "eliasmdes@gmail.com",
      birth_date: "1990-08-23",
      gender: "Masculino",
      height: 1.8,
      weight: 85,
    });

    const schedule1 = await createScheduleUseCase.execute({
      time: "2022-09-21 19:30:00",
      patient_id: patient.id,
    });

    expect(async () => {
      await createScheduleUseCase.execute({
        time: "2022-09-21 19:30:00",
        patient_id: patient.id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to create a schedule for a non-existent patient", async () => {
    const id = "eb63b0ae-00fc-41ac-bc02-aff1ed141d6b";
    expect(async () => {
      await createScheduleUseCase.execute({
        time: "2022-09-21 19:30:00",
        patient_id: id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a schedule invalid time", async () => {
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
      await createScheduleUseCase.execute({
        time: "2022-",
        patient_id: patient.id,
      });
    }).rejects.toBeInstanceOf(AppError);

    expect(async () => {
      await createScheduleUseCase.execute({
        time: "",
        patient_id: patient.id,
      });
    }).rejects.toBeInstanceOf(AppError);

    expect(async () => {
      await createScheduleUseCase.execute({
        time: "",
        patient_id: null,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
