import { IPatientDTO } from "@modules/patients/dtos/IPatientDTO";
import { Patient } from "@modules/patients/infra/typeorm/entities/Patient";
import { IPatientsRepository } from "../IPatientsRepository";

class PatientsRepositoryInMemory implements IPatientsRepository {
  patients: Patient[] = [];

  async create({
    name,
    phone_number,
    email,
    birth_date,
    gender,
    height,
    weight,
  }: IPatientDTO): Promise<Patient> {
    const patient = new Patient();

    Object.assign(patient, {
      name,
      phone_number,
      email,
      birth_date,
      gender,
      height,
      weight,
    });

    this.patients.push(patient);

    return patient;
  }

  async findById(id: string): Promise<Patient> {
    return this.patients.find((patient) => patient.id === id);
  }

  async findByEmail(email: string): Promise<Patient> {
    return this.patients.find((patient) => patient.email === email);
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
  }: IPatientDTO): Promise<void> {
    const findIndex = this.patients.findIndex((patient) => patient.id === id);
    this.patients[findIndex].name = name;
    this.patients[findIndex].phone_number = phone_number;
    this.patients[findIndex].email = email;
    this.patients[findIndex].birth_date = birth_date;
    this.patients[findIndex].gender = gender;
    this.patients[findIndex].height = height;
    this.patients[findIndex].weight = weight;
  }

  async findAll(): Promise<Patient[]> {
    return this.patients;
  }

  async delete(id: string): Promise<void> {
    const findIndex = this.patients.findIndex((patient) => patient.id === id);
    this.patients.splice(findIndex, 1);
  }
}

export { PatientsRepositoryInMemory };
