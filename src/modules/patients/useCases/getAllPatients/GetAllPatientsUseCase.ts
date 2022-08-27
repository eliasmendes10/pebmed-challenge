import { inject, injectable } from "tsyringe";

import { Patient } from "@modules/patients/infra/typeorm/entities/Patient";
import { IPatientsRepository } from "@modules/patients/repositories/IPatientsRepository";

@injectable()
class GetAllPatientsUseCase {
  constructor(
    @inject("PatientsRepository")
    private patientsRepository: IPatientsRepository
  ) {}

  public async execute(): Promise<Patient[]> {
    const patients = await this.patientsRepository.findAll();

    return patients;
  }
}

export { GetAllPatientsUseCase };
