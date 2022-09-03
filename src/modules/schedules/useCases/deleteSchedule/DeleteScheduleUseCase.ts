import { inject, injectable } from "tsyringe";

import { ISchedulesRepository } from "@modules/schedules/repositories/ISchedulesRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class DeleteScheduleUseCase {
  constructor(
    @inject("SchedulesRepository")
    private schedulesRepository: ISchedulesRepository
  ) {}

  public async execute(id: string): Promise<void> {
    const schedule = await this.schedulesRepository.findById(id);

    if (!schedule) {
      throw new AppError({ error: "Schedule doesn't exists" }, 400);
    }
    await this.schedulesRepository.delete(id);
  }
}

export { DeleteScheduleUseCase };
