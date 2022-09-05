import { IScheduleDTO } from "@modules/schedules/dtos/IScheduleDTO";
import { ISchedulesRepository } from "@modules/schedules/repositories/ISchedulesRepository";
import { IPatientsRepository } from "@modules/patients/repositories/IPatientsRepository";

import { UpdateScheduleValidatonModel } from "@shared/validation/validationModels/schedule/updateScheduleValidation.model";

import { Validator } from "@shared/validation/validator";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { Schedule } from "@modules/schedules/infra/typeorm/entities/Schedule";

@injectable()
class UpdateScheduleUseCase {
  constructor(
    @inject("SchedulesRepository")
    private schedulesRepository: ISchedulesRepository
  ) {}

  async execute({ time, id }: IScheduleDTO): Promise<Schedule> {
    const validator = new Validator();

    const validationErrors = await validator.validate(
      {
        time,
      },
      UpdateScheduleValidatonModel,
      false
    );

    if (validationErrors) {
      throw new AppError({ error: validationErrors.errors }, 400);
    }
    const schedule = await this.schedulesRepository.findById(id);

    if (!schedule) {
      throw new AppError({ error: "Schedule doesn't exists" }, 401);
    }

    await this.schedulesRepository.update({
      time,
      id,
    });

    return this.schedulesRepository.findById(id);
  }
}

export { UpdateScheduleUseCase };
