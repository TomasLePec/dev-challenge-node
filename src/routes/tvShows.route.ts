import { Router } from "express";
import { Routes } from "../interfaces/routes.interface";
import TVShowsController from "../controllers/tvShows.controller";
import authMiddleware from "../middlewares/auth.middleware";
import validateSchemaMiddleware from "../middlewares/validateSchemas.middleware";
import { TVShowGenerator } from "../joi/tvShows.schema";

class TVShowsRoute implements Routes {
  public path = '/tvShows';
  public router = Router();
  public tvShowsController = new TVShowsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/`,authMiddleware, this.tvShowsController.getTVShows);
    this.router.get(`${this.path}/:id`,authMiddleware, this.tvShowsController.getTVShowById);
    this.router.get(`${this.path}/:id/:season/:episode`,authMiddleware , this.tvShowsController.getEpisodeData)
    this.router.post(`${this.path}/create`,authMiddleware,validateSchemaMiddleware(TVShowGenerator), this.tvShowsController.createTVShow);
    this.router.delete(`${this.path}/:id`,authMiddleware, this.tvShowsController.deleteTVShow)
  }
}

export default TVShowsRoute;
