import { SchedulesRepositoryInMemory } from "@modules/schedules/repositories/in-memory/SchedulesRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreatePatientUseCase } from "@modules/patients/useCases/createPatient/CreatePatientUseCase";
import { PatientsRepositoryInMemory } from "@modules/patients/repositories/in-memory/PatientsRepositoryInMemory";
import { CreateScheduleUseCase } from "../createSchedule/CreateScheduleUseCase";
import { UpdateScheduleUseCase } from "./UpdateScheduleUseCase";

let createPatientUseCase: CreatePatientUseCase;
let patientsRepositoryInMemory: PatientsRepositoryInMemory;

let createScheduleUseCase: CreateScheduleUseCase;
let updateScheduleUseCase: UpdateScheduleUseCase;
let schedulesRepositoryInMemory: SchedulesRepositoryInMemory;

describe("Create Schedule", () => {
  beforeEach(() => {
    patientsRepositoryInMemory = new PatientsRepositoryInMemory();
    schedulesRepositoryInMemory = new SchedulesRepositoryInMemory();

    createPatientUseCase = new CreatePatientUseCase(patientsRepositoryInMemory);
    updateScheduleUseCase = new UpdateScheduleUseCase(
      schedulesRepositoryInMemory
    );
    createScheduleUseCase = new CreateScheduleUseCase(
      schedulesRepositoryInMemory,
      patientsRepositoryInMemory
    );
  });

  it("Should be able to update a non-existent schedule", async () => {
    const id = "eb63b0ae-00fc-41ac-bc02-aff1ed141d6b";

    expect(async () => {
      await updateScheduleUseCase.execute({
        time: "2022-09-21 19:30:00",
        patient_id: id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should be able to update a schedule", async () => {
    const patient = await createPatientUseCase.execute({
      name: "Elias Mendes4",
      phone_number: "48996412660",
      email: "eliasmdes@gmail.com",
      birth_date: "1990-08-23",
      gender: "Masculino",
      height: 180,
      weight: 85,
    });

    const schedule = await createScheduleUseCase.execute({
      time: "2022-09-21 19:30:00",
      patient_id: patient.id,
    });

    const changeSchedule = {
      time: "2022-09-22 19:30:00",
      patient_id: schedule.patient_id,
      id: schedule.id,
    };

    const actualSchedule = await updateScheduleUseCase.execute(changeSchedule);
    expect(actualSchedule).toMatchObject(changeSchedule);
  });

  it("should not be able to update a schedule invalid time", async () => {
    const patient = await createPatientUseCase.execute({
      name: "Elias Mendes4",
      phone_number: "48996412660",
      email: "eliasmdes@gmail.com",
      birth_date: "1990-08-23",
      gender: "Masculino",
      height: 180,
      weight: 85,
    });

    const schedule = await createScheduleUseCase.execute({
      time: "2022-09-21 19:30:00",
      patient_id: patient.id,
    });

    const changeSchedule = {
      time: "2022-test",
      patient_id: schedule.patient_id,
      id: schedule.id,
    };

    expect(async () => {
      await updateScheduleUseCase.execute(changeSchedule);
    }).rejects.toBeInstanceOf(AppError);
  });
});
