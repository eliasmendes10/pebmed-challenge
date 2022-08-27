import { ICreatePatientDTO } from "../dto/ICreatePatientDTO";
import { Patient } from "../infra/typeorm/entities/Patient";

interface IPatientsRepository {
  create(data: ICreatePatientDTO): Promise<Patient>;
  findById(id: string): Promise<Patient>;
  update(data: ICreatePatientDTO): Promise<void>;
  findByAll(): Promise<Patient[]>;
}

export { IPatientsRepository };
