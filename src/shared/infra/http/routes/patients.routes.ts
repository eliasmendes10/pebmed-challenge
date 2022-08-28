import { Router, Request, Response } from "express";

// import { body, validationResult } from "express-validator";

import { CreatePatientController } from "@modules/patients/useCases/createPatient/CreatePatientController";
import { ListPatientByIdController } from "@modules/patients/useCases/listPatientById/ListPatientByIdController";
import { UpdatePatientController } from "@modules/patients/useCases/updatePatient/UpdatePatientController";
import { GetAllPatientsController } from "@modules/patients/useCases/getAllPatients/GetAllPatientsController";

const patientsRoutes = Router();

const createPatientController = new CreatePatientController();
const listPatientByIdController = new ListPatientByIdController();
const updatePatientController = new UpdatePatientController();
const getAllPatientsController = new GetAllPatientsController();

patientsRoutes.post(
  "/",
  //   body("name").notEmpty(),
  //   (req: Request, res: Response) => {
  //     const errors = validationResult(req);
  //     if (!errors.isEmpty()) {
  //       return res.status(400).json({ errors: errors.array() });
  //     }
  //   },
  createPatientController.handle
);
patientsRoutes.get("/list/", getAllPatientsController.handle);
patientsRoutes.get("/:id", listPatientByIdController.handle);
patientsRoutes.put("/:id", updatePatientController.handle);

export { patientsRoutes };
