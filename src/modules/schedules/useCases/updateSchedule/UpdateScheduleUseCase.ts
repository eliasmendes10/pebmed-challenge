import { IScheduleDTO } from "@modules/schedules/dtos/IScheduleDTO";
import { ISchedulesRepository } from "@modules/schedules/repositories/ISchedulesRepository";
import { IPatientsRepository } from "@modules/patients/repositories/IPatientsRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class UpdateScheduleUseCase {
  constructor(
    @inject("SchedulesRepository")
    private schedulesRepository: ISchedulesRepository,
    @inject("PatientsRepository")
    private patientsRepository: IPatientsRepository
  ) {}

  async execute({ time, patient_id, id }: IScheduleDTO): Promise<void> {
    const schedule = await this.schedulesRepository.findById(id);

    if (!schedule) {
      throw new AppError("Schedule doesn't exists", 404);
    }

    const patient = await this.patientsRepository.findById(patient_id);

    if (!patient) {
      throw new AppError("Patient doesn't exists", 404);
    }

    await this.schedulesRepository.update({
      time,
      patient_id,
      id,
    });
  }
}

export { UpdateScheduleUseCase };
