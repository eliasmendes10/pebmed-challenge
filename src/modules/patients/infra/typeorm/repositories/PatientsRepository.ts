import { IPatientDTO } from "@modules/patients/dto/IPatientDTO";
import { IPatientsRepository } from "@modules/patients/repositories/IPatientsRepository";
import { getRepository, Repository } from "typeorm";
import { Patient } from "../entities/Patient";

class PatientsRepository implements IPatientsRepository {
  private repository: Repository<Patient>;

  constructor() {
    this.repository = getRepository(Patient);
  }

  async create({
    name,
    phone_number,
    email,
    birth_date,
    gender,
    height,
    weight,
  }: IPatientDTO): Promise<Patient> {
    const patient = this.repository.create({
      name,
      phone_number,
      email,
      birth_date,
      gender,
      height,
      weight,
    });
    console.log(patient);

    await this.repository.save(patient);
    return patient;
  }

  async findById(id: string): Promise<Patient> {
    const patient = await this.repository.findOne(id);

    return patient;
  }

  async update({
    name,
    phone_number,
    email,
    birth_date,
    gender,
    height,
    weight,
    id,
  }: IPatientDTO): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update({
        name,
        phone_number,
        email,
        birth_date,
        gender,
        height,
        weight,
      })
      .where({
        id: id,
      })
      .execute();
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
