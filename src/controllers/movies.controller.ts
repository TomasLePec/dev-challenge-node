import { Response, Request, NextFunction } from "express";
import moviesService from "../services/movies.service";
import { Schema } from "mongoose";
import { IMovie } from "../interfaces/movies.interface";
import { HttpException } from "../exceptions/HttpException";

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

  public getMovieById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id as unknown as Schema.Types.ObjectId;
      const movie = await this.moviesService.getMovieById(id);
      res.status(200).json({data: movie, message: `Movie`})
    } catch (err) {
      next(err)
    }
  };

  public createMovie = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: IMovie = req.body;
      const movie = await this.moviesService.createMovie(data);
      res.status(200).json({data: movie, message: `Movie`})
    } catch (err) {
      next(err)
    }
  };

  public updateMovie = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: IMovie = req.body;
      const id = req.params.id as unknown as Schema.Types.ObjectId;
      const movie = await this.moviesService.updateMovie(id,data);
      res.status(200).json({data: movie, message: `Movie`})
    } catch (err) {
      next(err)
    }
  };

  public deleteMovie = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id as unknown as Schema.Types.ObjectId;
      const movie = await this.moviesService.deleteMovie(id);
      res.status(200).json({ data: movie, message: 'Movie deleted' });
    } catch (err) {
      next(err)
    }
  };
}

export default MoviesController;
