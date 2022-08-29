import { IScheduleDTO } from "@modules/schedules/dtos/IScheduleDTO";
import { ISchedulesRepository } from "@modules/schedules/repositories/ISchedulesRepository";
import { getRepository, Repository } from "typeorm";
import { Schedule } from "../entities/Schedule";
import { validate } from "class-validator";
import { AppError } from "@shared/errors/AppError";

class SchedulesRepository implements ISchedulesRepository {
  private repository: Repository<Schedule>;

  constructor() {
    this.repository = getRepository(Schedule);
  }

  async create(schedule: IScheduleDTO): Promise<Schedule> {
    const errors = await validate(
      Object.setPrototypeOf(schedule, new IScheduleDTO())
    );

    if (errors.length > 0) {
      throw new AppError(errors);
    }

    const result = this.repository.create(schedule);

    await this.repository.save(result);

    return result;
  }

  async update(schedule: IScheduleDTO): Promise<void> {
    const errors = await validate(
      Object.setPrototypeOf(schedule, new IScheduleDTO())
    );

    if (errors.length > 0) {
      throw new AppError(errors);
    }

    await this.repository.update(schedule.id, schedule);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findById(id: string): Promise<Schedule> {
    return await this.repository.findOne(id);
  }

  async findAll(): Promise<Schedule[]> {
    const schedule = await this.repository.find({
      order: {
        time: "ASC",
      },
    });

    return schedule;
  }
}

export { SchedulesRepository };
