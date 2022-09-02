import { IScheduleDTO } from "@modules/schedules/dtos/IScheduleDTO";
import { Schedule } from "@modules/schedules/infra/typeorm/entities/Schedule";
import { ISchedulesRepository } from "../ISchedulesRepository";

class SchedulesRepositoryInMemory implements ISchedulesRepository {
  schedules: Schedule[] = [];

  async create({ time, patient_id }: IScheduleDTO): Promise<Schedule> {
    const schedule = new Schedule();

    Object.assign(schedule, { time, patient_id });

    this.schedules.push(schedule);

    return schedule;
  }

  async findById(id: string): Promise<Schedule> {
    return this.schedules.find((schedule) => schedule.id === id);
  }

  async update({ time, id }: IScheduleDTO): Promise<void> {
    const findIndex = this.schedules.findIndex(
      (schedule) => schedule.id === id
    );
    this.schedules[findIndex].time = time;
  }

  async findAll(): Promise<Schedule[]> {
    return this.schedules;
  }

  async delete(id: string): Promise<void> {
    const findIndex = this.schedules.findIndex(
      (schedule) => schedule.id === id
    );
    this.schedules.splice(findIndex, 1);
  }

  async getByTime(time: string): Promise<Schedule> {
    return this.schedules.find((schedule) => schedule.time === time);
  }
}
export { SchedulesRepositoryInMemory };
