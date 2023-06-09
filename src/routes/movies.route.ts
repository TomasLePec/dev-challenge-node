import { Router } from "express";
import { Routes } from "../interfaces/routes.interface";
import MoviesController from "../controllers/movies.controller";
import authMiddleware from "../middlewares/auth.middleware";
import validateSchemaMiddleware from "../middlewares/validateSchemas.middleware";
import { Movie } from "../joi/movies.schema";

class MoviesRoute implements Routes {
  public path = '/movies';
  public router = Router();
  public moviesController = new MoviesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/`,authMiddleware, this.moviesController.getMovies);
    this.router.get(`${this.path}/:id`,authMiddleware, this.moviesController.getMovieById);
    this.router.post(`${this.path}/`,authMiddleware,validateSchemaMiddleware(Movie), this.moviesController.createMovie)
    this.router.put(`${this.path}/:id`,authMiddleware,validateSchemaMiddleware(Movie), this.moviesController.updateMovie);
    this.router.delete(`${this.path}/:id`,authMiddleware, this.moviesController.deleteMovie)
  }
}

export default MoviesRoute;
