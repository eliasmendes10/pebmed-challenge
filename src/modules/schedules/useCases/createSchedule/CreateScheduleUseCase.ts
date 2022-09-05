import { IScheduleDTO } from "@modules/schedules/dtos/IScheduleDTO";
import { Schedule } from "@modules/schedules/infra/typeorm/entities/Schedule";
import { ISchedulesRepository } from "@modules/schedules/repositories/ISchedulesRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

import { RegisterScheduleValidatonModel } from "@shared/validation/validationModels/schedule/registerScheduleValidation.model";

import { Validator } from "@shared/validation/validator";
import { AppError } from "@shared/errors/AppError";

import { inject, injectable } from "tsyringe";
import { IPatientsRepository } from "@modules/patients/repositories/IPatientsRepository";

@injectable()
class CreateScheduleUseCase {
  constructor(
    @inject("SchedulesRepository")
    private schedulesRepository: ISchedulesRepository,
    @inject("PatientsRepository")
    private patientsRepository: IPatientsRepository
  ) {}

  async execute({ time, patient_id }: IScheduleDTO): Promise<Schedule> {
    const validator = new Validator();

    const validationErrors = await validator.validate(
      {
        time,
        patient_id,
      },
      RegisterScheduleValidatonModel,
      false
    );
    if (validationErrors) {
      throw new AppError({ error: validationErrors.errors }, 400);
    }

    // TODO: Alterar para comparar horas
    const scheduleByTime = await this.schedulesRepository.getByTime(time);

    if (scheduleByTime) {
      throw new AppError({ error: "Appointment time already registered" }, 401);
    }

    const patient = await this.patientsRepository.findById(patient_id);

    if (!patient) {
      throw new AppError({ error: "Patient doesn't exists" }, 402);
    }
    const schedule = await this.schedulesRepository.create({
      time,
      patient_id,
    });
    return schedule;
  }
}

export { CreateScheduleUseCase };
