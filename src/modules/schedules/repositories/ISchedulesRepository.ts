import { IScheduleDTO } from "../dtos/IScheduleDTO";
import { Schedule } from "../infra/typeorm/entities/Schedule";

interface ISchedulesRepository {
  create(data: IScheduleDTO): Promise<Schedule>;
  update(data: IScheduleDTO): Promise<void>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Schedule>;
  findAll(): Promise<Schedule[]>;
  getByTime(time: string): Promise<Schedule>;
}

export { ISchedulesRepository };
