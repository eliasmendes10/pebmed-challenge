import { IPatientDTO } from "@modules/patients/dto/IPatientDTO";
import { Patient } from "@modules/patients/infra/typeorm/entities/Patient";
import { IPatientsRepository } from "@modules/patients/repositories/IPatientsRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class UpdatePatientUseCase {
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
    id,
  }: IPatientDTO): Promise<void> {
    const patient = await this.patientsRepository.findById(id);

    if (!patient) {
      throw new AppError("Patient doesn't exists", 404);
    }

    await this.patientsRepository.update({
      name,
      phone_number,
      email,
      birth_date,
      gender,
      height,
      weight,
      id,
    });
  }
}

export { UpdatePatientUseCase };
