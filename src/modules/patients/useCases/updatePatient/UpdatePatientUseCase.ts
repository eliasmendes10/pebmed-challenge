import { IPatientDTO } from "@modules/patients/dtos/IPatientDTO";
import { IPatientsRepository } from "@modules/patients/repositories/IPatientsRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

import { UpdatePatientValidationModel } from "@shared/validation/validationModels/patient/updatePatientValidation.model";
import { Validator } from "@shared/validation/validator";

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
    const validator = new Validator();

    const validationErrors = await validator.validate(
      {
        name,
        phone_number,
        email,
        birth_date,
        gender,
        height,
        weight,
        id,
      },
      UpdatePatientValidationModel,
      false
    );

    if (validationErrors) {
      throw new AppError({ error: validationErrors.errors }, 400);
    }

    const patient = await this.patientsRepository.findById(id);

    if (!patient) {
      throw new AppError({ error: "Patient doesn't exists" }, 401);
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
