import { Router } from 'express';
import { Routes } from '../interfaces/routes.interface';
import ActorController from '../controllers/actors.controller';
import authMiddleware from '../middlewares/auth.middleware';
import validateSchemaMiddleware from '../middlewares/validateSchemas.middleware';
import { Actor } from '../joi/actor.schema';

class ActorsRoute implements Routes {
  public path = '/actors';
  public router = Router();
  public actorController = new ActorController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/`, authMiddleware, this.actorController.getActors);
    this.router.get(`${this.path}/:id`, authMiddleware, this.actorController.getActorById);
    this.router.post(
      `${this.path}/`,
      authMiddleware,
      validateSchemaMiddleware(Actor),
      this.actorController.createActor,
    );
    this.router.put(
      `${this.path}/:id`,
      authMiddleware,
      validateSchemaMiddleware(Actor),
      this.actorController.updateActor,
    );
  }
}

export default ActorsRoute;
