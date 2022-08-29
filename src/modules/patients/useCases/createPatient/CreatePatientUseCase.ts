import { IPatientDTO } from "@modules/patients/dtos/IPatientDTO";
import { Patient } from "@modules/patients/infra/typeorm/entities/Patient";
import { IPatientsRepository } from "@modules/patients/repositories/IPatientsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class CreatePatientUseCase {
  constructor(
    @inject("PatientsRepository")
    private patientsRepository: IPatientsRepository
  ) {}

  async execute({
    name,
    phone_number,
    email,
    birth_date,
    gender,
    height,
    weight,
  }: IPatientDTO): Promise<Patient> {
    const patient = await this.patientsRepository.create({
      name,
      phone_number,
      email,
      birth_date,
      gender,
      height,
      weight,
    });

    return patient;
  }
}

export { CreatePatientUseCase };
