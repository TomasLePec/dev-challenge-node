import { Router } from "express";
import { Routes } from "../interfaces/routes.interface";
import MoviesController from "../controllers/movies.controller";

class MoviesRoute implements Routes {
  public path = '/movies';
  public router = Router();
  public moviesController = new MoviesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/`, this.moviesController.getMovies);

  }
}

export default MoviesRoute;
