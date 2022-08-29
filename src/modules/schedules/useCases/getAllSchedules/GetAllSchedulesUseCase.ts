import { inject, injectable } from "tsyringe";

import { Schedule } from "@modules/schedules/infra/typeorm/entities/Schedule";
import { ISchedulesRepository } from "@modules/schedules/repositories/ISchedulesRepository";

@injectable()
class GetAllSchedulesUseCase {
  constructor(
    @inject("SchedulesRepository")
    private schedulesRepository: ISchedulesRepository
  ) {}

  public async execute(): Promise<Schedule[]> {
    const schedules = await this.schedulesRepository.findAll();

    return schedules;
  }
}

export { GetAllSchedulesUseCase };
