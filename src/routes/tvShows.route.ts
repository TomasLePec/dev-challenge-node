import { Router } from "express";
import { Routes } from "../interfaces/routes.interface";
import TVShowsController from "../controllers/tvShows.controller";
import { HttpException } from "../exceptions/HttpException";

class TVShowsRoute implements Routes {
  public path = '/tvShows';
  public router = Router();
  public tvShowsController = new TVShowsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/`, this.tvShowsController.getTVShows);
    this.router.get(`${this.path}/:id`, this.tvShowsController.getTVShowById);
    this.router.get(`${this.path}/:id/:season/:episode`, this.tvShowsController.getEpisodeData)
    this.router.post(`${this.path}/create`, this.tvShowsController.createTVShows)
  }
}

export default TVShowsRoute;
