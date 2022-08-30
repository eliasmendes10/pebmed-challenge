import { Router, Request, Response } from "express";

import { CreatePatientController } from "@modules/patients/useCases/createPatient/CreatePatientController";
import { ListPatientByIdController } from "@modules/patients/useCases/listPatientById/ListPatientByIdController";
import { UpdatePatientController } from "@modules/patients/useCases/updatePatient/UpdatePatientController";
import { GetAllPatientsController } from "@modules/patients/useCases/getAllPatients/GetAllPatientsController";
import { DeletePatientController } from "@modules/patients/useCases/deletePatient/DeletePatientController";

const patientsRoutes = Router();

const createPatientController = new CreatePatientController();
const listPatientByIdController = new ListPatientByIdController();
const updatePatientController = new UpdatePatientController();
const getAllPatientsController = new GetAllPatientsController();
const deletePatientController = new DeletePatientController();

patientsRoutes.post("/", createPatientController.handle);
patientsRoutes.get("/list/", getAllPatientsController.handle);
patientsRoutes.get("/:id", listPatientByIdController.handle);
patientsRoutes.put("/:id", updatePatientController.handle);
patientsRoutes.delete("/:id", deletePatientController.handle);

export { patientsRoutes };
