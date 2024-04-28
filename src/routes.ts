import { Router } from "express";
import { filmController } from "./controller/FilmController";
import { userController } from "./controller/UserController";

const routes = Router();

routes.post("/films", filmController.create);
routes.get("/films", filmController.list);
routes.get("/films/:id", filmController.getById);
routes.put("/films/:id", filmController.update);
routes.delete("/films/:id", filmController.delete);

routes.post("/users", userController.create);
routes.get("/users/:id", userController.getById);

export default routes;