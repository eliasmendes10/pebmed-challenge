import { container } from "tsyringe";

import "@shared/container/providers";

import { IPatientsRepository } from "@modules/patients/repositories/IPatientsRepository";
import { PatientsRepository } from "@modules/patients/infra/typeorm/repositories/PatientsRepository";
import { ISchedulesRepository } from "@modules/schedules/repositories/ISchedulesRepository";
import { SchedulesRepository } from "@modules/schedules/infra/typeorm/repositories/SchedulesRepository";
import { INotesRepository } from "@modules/notes/repositories/INotesRepository";
import { NotesRepository } from "@modules/notes/infra/typeorm/repositories/NotesRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";

container.registerSingleton<IPatientsRepository>(
  "PatientsRepository",
  PatientsRepository
);

container.registerSingleton<ISchedulesRepository>(
  "SchedulesRepository",
  SchedulesRepository
);

container.registerSingleton<INotesRepository>(
  "NotesRepository",
  NotesRepository
);

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);
