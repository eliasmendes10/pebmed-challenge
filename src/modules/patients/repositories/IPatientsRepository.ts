import { IPatientDTO } from "../dtos/IPatientDTO";
import { Patient } from "../infra/typeorm/entities/Patient";

interface IPatientsRepository {
  create(data: IPatientDTO): Promise<Patient>;
  findById(id: string): Promise<Patient>;
  findByEmail(id: string): Promise<Patient>;
  update(data: IPatientDTO): Promise<void>;
  findAll(): Promise<Patient[] | Patient[]>;
  delete(id: string): Promise<void>;
}

export { IPatientsRepository };
