import { inject, injectable } from "tsyringe";

import { Schedule } from "@modules/schedules/infra/typeorm/entities/Schedule";
import { ISchedulesRepository } from "@modules/schedules/repositories/ISchedulesRepository";

@injectable()
class ListScheduleByIdUseCase {
  constructor(
    @inject("SchedulesRepository")
    private schedulesRepository: ISchedulesRepository
  ) {}

  public async execute(id: string): Promise<Schedule> {
    return await this.schedulesRepository.findById(id);
  }
}

export { ListScheduleByIdUseCase };
