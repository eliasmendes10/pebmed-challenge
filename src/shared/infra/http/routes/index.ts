import { Router } from "express";
import { patientsRoutes } from "./patients.routes";
import { schedulesRoutes } from "./schedules.routes";
import { notesRoutes } from "./notes.routes";

const router = Router();

router.use("/patient", patientsRoutes);
router.use("/schedule", schedulesRoutes);
router.use("/note", notesRoutes);

export { router };
