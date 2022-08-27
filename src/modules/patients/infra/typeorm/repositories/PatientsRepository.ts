import { ICreatePatientDTO } from "@modules/patients/dto/ICreatePatientDTO";
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
  }: ICreatePatientDTO): Promise<Patient> {
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
  }: ICreatePatientDTO): Promise<void> {
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
      .returning("*")
      .execute();
  }

  async findByAll(): Promise<Patient[]> {
    const patient = await this.repository.find({
      order: {
        name: "ASC",
      },
    });

    return patient;
  }
}

export { PatientsRepository };
