import { IPatientDTO } from "../dto/IPatientDTO";
import { Patient } from "../infra/typeorm/entities/Patient";

interface IPatientsRepository {
  create(data: IPatientDTO): Promise<Patient>;
  findById(id: string): Promise<Patient>;
  update(data: IPatientDTO): Promise<void>;
  findAll(): Promise<Patient[]>;
}

export { IPatientsRepository };
