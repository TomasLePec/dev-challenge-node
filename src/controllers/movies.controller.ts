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

  public getMovieById = async (req: Request<{id: Schema.Types.ObjectId}>, res: Response, next: NextFunction) => {
    try {
      const id: Schema.Types.ObjectId = req.params.id;
      if (!id) throw new HttpException(400, "No id provided")
      const movie = await this.moviesService.getMovieById(id);
      res.status(200).json({data: movie, message: `Movie`})
    } catch (err) {
      next(err)
    }
  };

  public createMovie = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: IMovie = req.body;
      if (!data) throw new HttpException(400, "data is empty")
      const movie = await this.moviesService.createMovie(data);
      res.status(200).json({data: movie, message: `Movie`})
    } catch (err) {
      next(err)
    }
  };

  public updateMovie = async (req: Request<{id: Schema.Types.ObjectId}>, res: Response, next: NextFunction) => {
    try {
      const data: IMovie = req.body;
      if (!data) throw new HttpException(400, "data is empty")
      const id: Schema.Types.ObjectId = req.params.id;
      if (!id) throw new HttpException(400, "No id provided")
      const movie = await this.moviesService.updateMovie(id,data);
      res.status(200).json({data: movie, message: `Movie`})
    } catch (err) {
      next(err)
    }
  };

  public deleteMovie = async (req: Request<{id: Schema.Types.ObjectId}>, res: Response, next: NextFunction) => {
    try {
      const id: Schema.Types.ObjectId = req.params.id;
      if (!id) throw new HttpException(400, "No id provided")
      const movie = await this.moviesService.deleteMovie(id);
      res.status(200).json({ data: movie, message: 'Movie deleted' });
    } catch (err) {
      next(err)
    }
  };
}

export default MoviesController;
