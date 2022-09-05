import { IPatientDTO } from "@modules/patients/dtos/IPatientDTO";
import { Patient } from "@modules/patients/infra/typeorm/entities/Patient";
import { IPatientsRepository } from "@modules/patients/repositories/IPatientsRepository";
import { inject, injectable } from "tsyringe";

import { CreatePatientValidationModel } from "@shared/validation/validationModels/patient/createPatientValidation.model";

import { Validator } from "@shared/validation/validator";
import { AppError } from "@shared/errors/AppError";

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
      },
      CreatePatientValidationModel,
      false
    );

    if (validationErrors) {
      throw new AppError({ error: validationErrors.errors }, 400);
    }

    const patientExists = await this.patientsRepository.findByEmail(email);

    if (patientExists) {
      throw new AppError({ error: "Patient already exists" }, 401);
    }

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
