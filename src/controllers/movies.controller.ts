import { Response, Request, NextFunction } from "express";
import moviesService from "../services/movies.service";

class MoviesController {
  public moviesService = new moviesService()

  public getMovies = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const movies = await this.moviesService.getAllMovies();
      res.status(200).json({data: movies, message: 'All Movies'})
    } catch (err) {
      next(err)
    }
  };

  public getMoviesByDirector = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const director = req.params.director;
      const movies = await this.moviesService.getMoviesByDirector(director);
      res.status(200).json({data: movies, message: `All ${director} movies`})
    } catch (err) {
      next(err)
    }
  };
}

export default MoviesController;
