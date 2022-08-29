import { IScheduleDTO } from "@modules/schedules/dtos/IScheduleDTO";
import { Schedule } from "@modules/schedules/infra/typeorm/entities/Schedule";
import { ISchedulesRepository } from "@modules/schedules/repositories/ISchedulesRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class CreateScheduleUseCase {
  constructor(
    @inject("SchedulesRepository")
    private schedulesRepository: ISchedulesRepository
  ) {}

  async execute({ time, patient_id }: IScheduleDTO): Promise<Schedule> {
    const schedule = await this.schedulesRepository.create({
      time,
      patient_id,
    });

    return schedule;
  }
}

export { CreateScheduleUseCase };
