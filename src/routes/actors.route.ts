import { Router } from "express";
import { Routes } from "../interfaces/routes.interface";
import ActorController from "../controllers/actors.controller";

class ActorsRoute implements Routes {
  public path = '/actors';
  public router = Router();
  public actorController = new ActorController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/`, this.actorController.getActors);
    this.router.get(`${this.path}/:id`, this.actorController.getActorById)
    this.router.post(`${this.path}/`, this.actorController.createActor);
  }
}

export default ActorsRoute;
