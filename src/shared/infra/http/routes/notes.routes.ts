import { Router, Request, Response } from "express";

import { CreateNoteController } from "@modules/notes/useCases/createNote/CreateNoteController";
import { ListNoteController } from "@modules/notes/useCases/listNoteByPatient/ListNoteController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const notesRoutes = Router();

const createNoteController = new CreateNoteController();
const listNoteController = new ListNoteController();

notesRoutes.post("/", ensureAuthenticated, createNoteController.handle);
notesRoutes.get("/list/:id", ensureAuthenticated, listNoteController.handle);

export { notesRoutes };
