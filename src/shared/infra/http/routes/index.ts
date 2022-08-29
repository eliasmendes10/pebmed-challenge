import { Router } from "express";
import { patientsRoutes } from "./patients.routes";
import { schedulesRoutes } from "./schedules.routes";

const router = Router();

router.use("/patient", patientsRoutes);
router.use("/schedule", schedulesRoutes);

export { router };
