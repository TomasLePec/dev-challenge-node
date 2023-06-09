import { Router } from 'express';
import { Routes } from '../interfaces/routes.interface';
import DirectorController from '../controllers/directors.controller';
import authMiddleware from '../middlewares/auth.middleware';
import validateSchemaMiddleware from '../middlewares/validateSchemas.middleware';
import { Director } from '../joi/director.schema';

class DirectorsRoute implements Routes {
  public path = '/directors';
  public router = Router();
  public directorController = new DirectorController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/`, authMiddleware, this.directorController.getDirectors);
    this.router.get(`${this.path}/:id`, authMiddleware, this.directorController.getDirectorById);
    this.router.post(
      `${this.path}/`,
      authMiddleware,
      validateSchemaMiddleware(Director),
      this.directorController.createDirector,
    );
    this.router.put(
      `${this.path}/:id`,
      authMiddleware,
      validateSchemaMiddleware(Director),
      this.directorController.updateDirector,
    );
  }
}

export default DirectorsRoute;
