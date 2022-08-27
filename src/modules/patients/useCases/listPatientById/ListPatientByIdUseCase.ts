import { inject, injectable } from "tsyringe";

import { Patient } from "@modules/patients/infra/typeorm/entities/Patient";
import { IPatientsRepository } from "@modules/patients/repositories/IPatientsRepository";

@injectable()
class ListPatientByIdUseCase {
  constructor(
    @inject("PatientsRepository")
    private patientsRepository: IPatientsRepository
  ) {}

  public async execute(id: string): Promise<Patient> {
    const patientById = await this.patientsRepository.findById(id);

    return patientById;
  }
}

export { ListPatientByIdUseCase };
