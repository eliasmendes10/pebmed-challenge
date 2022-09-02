import { inject, injectable } from "tsyringe";

import { Patient } from "@modules/patients/infra/typeorm/entities/Patient";
import { IPatientsRepository } from "@modules/patients/repositories/IPatientsRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class ListPatientByIdUseCase {
  constructor(
    @inject("PatientsRepository")
    private patientsRepository: IPatientsRepository
  ) {}

  public async execute(id: string): Promise<Patient> {
    const patient = await this.patientsRepository.findById(id);

    if (!patient) {
      throw new AppError("Patient doesn't exists", 404);
    }
    return patient;
  }
}

export { ListPatientByIdUseCase };
