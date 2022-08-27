import { Router } from "express";
import { patientsRoutes } from "./patients.routes";

const router = Router();

router.use("/patient", patientsRoutes);

export { router };
