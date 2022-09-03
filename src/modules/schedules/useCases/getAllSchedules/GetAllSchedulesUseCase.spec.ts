import { PatientsRepositoryInMemory } from "@modules/patients/repositories/in-memory/PatientsRepositoryInMemory";
import { CreatePatientUseCase } from "@modules/patients/useCases/createPatient/CreatePatientUseCase";
import { SchedulesRepositoryInMemory } from "@modules/schedules/repositories/in-memory/SchedulesRepositoryInMemory";
import { CreateScheduleUseCase } from "../createSchedule/CreateScheduleUseCase";
import { GetAllSchedulesUseCase } from "./GetAllSchedulesUseCase";

let createPatientUseCase: CreatePatientUseCase;
let createScheduleUseCase: CreateScheduleUseCase;
let getAllSchedulesUseCase: GetAllSchedulesUseCase;
let patientsRepositoryInMemory: PatientsRepositoryInMemory;
let schedulesRepositoryInMemory: SchedulesRepositoryInMemory;

describe("List all Schedules", () => {
  beforeEach(() => {
    patientsRepositoryInMemory = new PatientsRepositoryInMemory();
    schedulesRepositoryInMemory = new SchedulesRepositoryInMemory();

    createPatientUseCase = new CreatePatientUseCase(patientsRepositoryInMemory);
    createScheduleUseCase = new CreateScheduleUseCase(
      schedulesRepositoryInMemory,
      patientsRepositoryInMemory
    );
    getAllSchedulesUseCase = new GetAllSchedulesUseCase(
      schedulesRepositoryInMemory
    );
  });

  it("Should be able to list all Schedules", async () => {
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

    await createScheduleUseCase.execute({
      time: "2022-08-22 19:30:00",
      patient_id: patient.id,
    });

    await createScheduleUseCase.execute({
      time: "2022-07-23 19:30:00",
      patient_id: patient.id,
    });

    const schedules = await getAllSchedulesUseCase.execute();

    expect(schedules).toHaveLength(3);
  });
});
