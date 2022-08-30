import { IScheduleDTO } from "@modules/schedules/dtos/IScheduleDTO";
import { Schedule } from "@modules/schedules/infra/typeorm/entities/Schedule";
import { ISchedulesRepository } from "@modules/schedules/repositories/ISchedulesRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class CreateScheduleUseCase {
  constructor(
    @inject("SchedulesRepository")
    private schedulesRepository: ISchedulesRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute({ time, patient_id }: IScheduleDTO): Promise<Schedule> {
    // TODO: Alterar para comparar horas
    const scheduleByTime = await this.schedulesRepository.getByTime(time);

    if (scheduleByTime) {
      throw new AppError("Appointment time already registered", 400);
    }

    const schedule = await this.schedulesRepository.create({
      time,
      patient_id,
    });

    return schedule;
  }
}

export { CreateScheduleUseCase };
