import { inject, injectable } from "tsyringe";

import { IPatientsRepository } from "@modules/patients/repositories/IPatientsRepository";

@injectable()
class DeletePatientUseCase {
  constructor(
    @inject("PatientsRepository")
    private patientsRepository: IPatientsRepository
  ) {}

  public async execute(id: string): Promise<void> {
    await this.patientsRepository.delete(id);
  }
}

export { DeletePatientUseCase };
