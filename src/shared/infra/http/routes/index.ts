import { Router } from "express";
import { authenticateRoutes } from "./authenticate.routes";
import { patientsRoutes } from "./patients.routes";
import { schedulesRoutes } from "./schedules.routes";
import { notesRoutes } from "./notes.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

router.use("/user", usersRoutes);
router.use("/patient", patientsRoutes);
router.use("/schedule", schedulesRoutes);
router.use("/note", notesRoutes);
router.use(authenticateRoutes);

export { router };
