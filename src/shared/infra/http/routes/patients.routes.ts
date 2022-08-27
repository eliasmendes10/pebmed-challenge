import { Router } from "express";

import { CreatePatientController } from "@modules/patients/useCases/createPatient/CreatePatientController";
import { ListPatientByIdController } from "@modules/patients/useCases/listPatientById/ListPatientByIdController";

const patientsRoutes = Router();

const createPatientController = new CreatePatientController();
const listPatientByIdController = new ListPatientByIdController();

patientsRoutes.post("/", createPatientController.handle);

patientsRoutes.get("/:id", listPatientByIdController.handle);

export { patientsRoutes };
