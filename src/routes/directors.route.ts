import { Router } from "express";
import { Routes } from "../interfaces/routes.interface";
import DirectorController from "../controllers/directors.controller";

class DirectorsRoute implements Routes {
  public path = '/directors';
  public router = Router();
  public directorController = new DirectorController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/`, this.directorController.getDirectors);
    this.router.get(`${this.path}/:id`, this.directorController.getDirectorById)
    this.router.post(`${this.path}/`, this.directorController.createDirector);
  }
}

export default DirectorsRoute;
