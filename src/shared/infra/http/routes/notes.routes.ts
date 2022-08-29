import { Router, Request, Response } from "express";

import { CreateNoteController } from "@modules/notes/useCases/createNote/CreateNoteController";
import { ListNoteController } from "@modules/notes/useCases/listNoteByPatient/ListNoteController";

const notesRoutes = Router();

const createNoteController = new CreateNoteController();
const listNoteController = new ListNoteController();

notesRoutes.post("/", createNoteController.handle);
notesRoutes.get("/list/:id", listNoteController.handle);

export { notesRoutes };
