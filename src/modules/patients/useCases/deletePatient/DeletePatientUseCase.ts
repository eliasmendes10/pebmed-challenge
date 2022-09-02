import { inject, injectable } from "tsyringe";

import { IPatientsRepository } from "@modules/patients/repositories/IPatientsRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class DeletePatientUseCase {
  constructor(
    @inject("PatientsRepository")
    private patientsRepository: IPatientsRepository
  ) {}

  public async execute(id: string): Promise<void> {
    const patient = await this.patientsRepository.findById(id);

    if (!patient) {
      throw new AppError({ error: "Patient doesn't exists" }, 400);
    }
    await this.patientsRepository.delete(id);
  }
}

export { DeletePatientUseCase };
