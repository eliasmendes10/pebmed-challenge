import { inject, injectable } from "tsyringe";

import { ISchedulesRepository } from "@modules/schedules/repositories/ISchedulesRepository";

@injectable()
class DeleteScheduleUseCase {
  constructor(
    @inject("SchedulesRepository")
    private schedulesRepository: ISchedulesRepository
  ) {}

  public async execute(id: string): Promise<void> {
    await this.schedulesRepository.delete(id);
  }
}

export { DeleteScheduleUseCase };
