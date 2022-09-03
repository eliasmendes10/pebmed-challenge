import { inject, injectable } from "tsyringe";

import { Schedule } from "@modules/schedules/infra/typeorm/entities/Schedule";
import { ISchedulesRepository } from "@modules/schedules/repositories/ISchedulesRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class ListScheduleByIdUseCase {
  constructor(
    @inject("SchedulesRepository")
    private schedulesRepository: ISchedulesRepository
  ) {}

  public async execute(id: string): Promise<Schedule> {
    const schedule = await this.schedulesRepository.findById(id);

    if (!schedule) {
      throw new AppError({ error: "Schedule doesn't exists" }, 400);
    }
    return schedule;
  }
}

export { ListScheduleByIdUseCase };
