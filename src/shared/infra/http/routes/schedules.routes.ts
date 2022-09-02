import { Router, Request, Response } from "express";

import { CreateScheduleController } from "@modules/schedules/useCases/createSchedule/CreateScheduleController";
import { GetAllSchedulesController } from "@modules/schedules/useCases/getAllSchedules/GetAllSchedulesController";
import { UpdateScheduleController } from "@modules/schedules/useCases/updateSchedule/UpdateScheduleController";
import { ListScheduleByIdController } from "@modules/schedules/useCases/ListScheduleById/ListScheduleByIdController";
import { DeleteScheduleController } from "@modules/schedules/useCases/deleteSchedule/DeleteScheduleController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const schedulesRoutes = Router();

const createScheduleController = new CreateScheduleController();
const getAllSchedulesController = new GetAllSchedulesController();
const updateScheduleController = new UpdateScheduleController();
const listScheduleByIdController = new ListScheduleByIdController();
const deleteScheduleController = new DeleteScheduleController();

schedulesRoutes.post("/", ensureAuthenticated, createScheduleController.handle);
schedulesRoutes.get(
  "/list/",
  ensureAuthenticated,
  getAllSchedulesController.handle
);
schedulesRoutes.put(
  "/:id",
  ensureAuthenticated,
  updateScheduleController.handle
);
schedulesRoutes.get(
  "/:id",
  ensureAuthenticated,
  listScheduleByIdController.handle
);
schedulesRoutes.delete(
  "/:id",
  ensureAuthenticated,
  deleteScheduleController.handle
);

export { schedulesRoutes };
