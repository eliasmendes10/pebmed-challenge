import { PatientsRepositoryInMemory } from "@modules/patients/repositories/in-memory/PatientsRepositoryInMemory";
import { CreatePatientUseCase } from "@modules/patients/useCases/createPatient/CreatePatientUseCase";
import { SchedulesRepositoryInMemory } from "@modules/schedules/repositories/in-memory/SchedulesRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateScheduleUseCase } from "../createSchedule/CreateScheduleUseCase";
import { ListScheduleByIdUseCase } from "./ListScheduleByIdUseCase";

let createPatientUseCase: CreatePatientUseCase;
let createScheduleUseCase: CreateScheduleUseCase;
let listScheduleByIdUseCase: ListScheduleByIdUseCase;
let patientsRepositoryInMemory: PatientsRepositoryInMemory;
let schedulesRepositoryInMemory: SchedulesRepositoryInMemory;

describe("List specific Schedule", () => {
  beforeEach(() => {
    patientsRepositoryInMemory = new PatientsRepositoryInMemory();
    schedulesRepositoryInMemory = new SchedulesRepositoryInMemory();

    createPatientUseCase = new CreatePatientUseCase(patientsRepositoryInMemory);
    createScheduleUseCase = new CreateScheduleUseCase(
      schedulesRepositoryInMemory,
      patientsRepositoryInMemory
    );
    listScheduleByIdUseCase = new ListScheduleByIdUseCase(
      schedulesRepositoryInMemory
    );
  });

  it("Should be able to list a non-existent schedule", async () => {
    const id = "eb63b0ae-00fc-41ac-bc02-aff1ed141d6b";

    expect(async () => {
      await listScheduleByIdUseCase.execute(id);
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should be able to list a existent schedule", async () => {
    const patient = await createPatientUseCase.execute({
      name: "Elias Mendes",
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

    const selectedSchedule = await listScheduleByIdUseCase.execute(schedule.id);

    expect(selectedSchedule).toHaveProperty("id");
  });
});
