import { container } from "tsyringe";

import "@shared/container/providers";

import { IPatientsRepository } from "@modules/patients/repositories/IPatientsRepository";
import { PatientsRepository } from "@modules/patients/infra/typeorm/repositories/PatientsRepository";

container.registerSingleton<IPatientsRepository>(
  "PatientsRepository",
  PatientsRepository
);
