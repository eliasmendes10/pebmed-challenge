import { IPatientDTO } from "@modules/patients/dtos/IPatientDTO";
import { IPatientsRepository } from "@modules/patients/repositories/IPatientsRepository";
import { getRepository, Repository } from "typeorm";
import { Patient } from "../entities/Patient";
import { validate } from "class-validator";
import { AppError } from "@shared/errors/AppError";

class PatientsRepository implements IPatientsRepository {
  private repository: Repository<Patient>;

  constructor() {
    this.repository = getRepository(Patient);
  }

  async create(patient: IPatientDTO): Promise<Patient> {
    const errors = await validate(
      Object.setPrototypeOf(patient, new IPatientDTO())
    );

    if (errors.length > 0) {
      throw new AppError(errors);
    }

    const result = this.repository.create(patient);

    await this.repository.save(result);
    return result;
  }

  async findById(id: string): Promise<Patient> {
    const patient = await this.repository.findOne(id);

    return patient;
  }

  async update(patient: IPatientDTO): Promise<void> {
    const errors = await validate(
      Object.setPrototypeOf(patient, new IPatientDTO())
    );

    if (errors.length > 0) {
      throw new AppError(errors);
    }

    await this.repository.update(patient.id, patient);
  }

  async findAll(): Promise<Patient[]> {
    const patient = await this.repository.find({
      order: {
        name: "ASC",
      },
    });

    return patient;
  }
}

export { PatientsRepository };
