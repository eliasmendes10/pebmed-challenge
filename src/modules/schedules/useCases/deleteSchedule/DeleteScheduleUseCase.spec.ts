import { PatientsRepositoryInMemory } from "@modules/patients/repositories/in-memory/PatientsRepositoryInMemory";
import { CreatePatientUseCase } from "@modules/patients/useCases/createPatient/CreatePatientUseCase";
import { SchedulesRepositoryInMemory } from "@modules/schedules/repositories/in-memory/SchedulesRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateScheduleUseCase } from "../createSchedule/CreateScheduleUseCase";
import { ListScheduleByIdUseCase } from "../ListScheduleById/ListScheduleByIdUseCase";
import { DeleteScheduleUseCase } from "./DeleteScheduleUseCase";

let patientsRepositoryInMemory: PatientsRepositoryInMemory;
let schedulesRepositoryInMemory: SchedulesRepositoryInMemory;

let createPatientUseCase: CreatePatientUseCase;
let createScheduleUseCase: CreateScheduleUseCase;
let deleteScheduleUseCase: DeleteScheduleUseCase;
let listScheduleByIdUseCase: ListScheduleByIdUseCase;

describe("Delete Schedule", () => {
  beforeEach(() => {
    patientsRepositoryInMemory = new PatientsRepositoryInMemory();
    schedulesRepositoryInMemory = new SchedulesRepositoryInMemory();

    createPatientUseCase = new CreatePatientUseCase(patientsRepositoryInMemory);

    createScheduleUseCase = new CreateScheduleUseCase(
      schedulesRepositoryInMemory,
      patientsRepositoryInMemory
    );
    deleteScheduleUseCase = new DeleteScheduleUseCase(
      schedulesRepositoryInMemory
    );
    listScheduleByIdUseCase = new ListScheduleByIdUseCase(
      schedulesRepositoryInMemory
    );
  });
  it("Should be able to delete a non-existent schedule", async () => {
    const id = "eb63b0ae-00fc-41ac-bc02-aff1ed141d6b";

    expect(async () => {
      await deleteScheduleUseCase.execute(id);
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should be able to delete a schedule", async () => {
    const patient = await createPatientUseCase.execute({
      name: "Elias Mendes",
      phone_number: "48996412660",
      email: "eliasmdes@gmail.com",
      birth_date: "1990-08-23",
      gender: "Masculino",
      height: 1.8,
      weight: 85,
    });
    const schedule = {
      time: "2022-09-21 19:30:00",
      patient_id: patient.id,
    };

    const newSchedule = await createScheduleUseCase.execute(schedule);
    const currentSchedule = await listScheduleByIdUseCase.execute(
      newSchedule.id
    );

    expect(currentSchedule).toMatchObject(newSchedule);

    await deleteScheduleUseCase.execute(currentSchedule.id);

    expect(async () => {
      await listScheduleByIdUseCase.execute(newSchedule.id);
    }).rejects.toBeInstanceOf(AppError);
  });
});
