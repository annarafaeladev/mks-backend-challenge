import { Router } from "express";
import { filmController } from "./controller/FilmController";

const routes = Router();

routes.post("/films", filmController.create);

export default routes;