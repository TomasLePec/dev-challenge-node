import { Router } from "express";
import { Routes } from "../interfaces/routes.interface";
import MoviesController from "../controllers/movies.controller";
import movieModel, { movieSchema } from "../models/movies.model";
import { HttpException } from "../exceptions/HttpException";

class MoviesRoute implements Routes {
  public path = '/movies';
  public router = Router();
  public moviesController = new MoviesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/`, this.moviesController.getMovies);
    this.router.get(`${this.path}/:id`, this.moviesController.getMovieById);
    this.router.post(`${this.path}/`, this.moviesController.createMovie)
    this.router.put(`${this.path}/:id`, this.moviesController.updateMovie);
    this.router.delete(`${this.path}/:id`, this.moviesController.deleteMovie)
  }
}

export default MoviesRoute;
