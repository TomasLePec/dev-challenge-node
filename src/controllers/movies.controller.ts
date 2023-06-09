import { Response, Request, NextFunction } from 'express';
import moviesService from '../services/movies.service';
import { Schema } from 'mongoose';
import { IMovie } from '../interfaces/movies.interface';
import { HttpException } from '../exceptions/HttpException';
import { success } from '../success/constants';
import { errors } from '../errors/constants';

class MoviesController {
  public moviesService = new moviesService();

  public getMovies = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { title, sortBy } = req.query;
      const filter: any = {};
      if (title) {
        filter.title = { $regex: title, $options: 'i' };
      }
      const sort: any = {};
      if (sortBy === 'title') {
        sort.title = 1;
      } else if (sortBy === '-title') {
        sort.title = -1;
      } else if (sortBy === 'year') {
        sort.year = 1;
      } else if (sortBy === '-year') {
        sort.year = -1;
      }
      const movies = await this.moviesService.getAllMovies(filter, sort);
      res.status(success.SUCCESS_GET).json({ data: movies, message: 'All Movies' });
    } catch (err) {
      next(err);
    }
  };

  public getMovieById = async (
    req: Request<{ id: Schema.Types.ObjectId }>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const id: Schema.Types.ObjectId = req.params.id;
      if (!id) throw new HttpException(errors.MISSING_ID.httpCpde, errors.MISSING_ID.message);
      const movie = await this.moviesService.getMovieById(id);
      res.status(success.SUCCESS_GET).json({ data: movie, message: `Movie` });
    } catch (err) {
      next(err);
    }
  };

  public createMovie = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: IMovie = req.body;
      if (!data) throw new HttpException(errors.EMPTY_DATA.httpCode, errors.EMPTY_DATA.message);
      const movie = await this.moviesService.createMovie(data);
      res.status(success.SUCCESS_POST).json({ data: movie, message: `Movie` });
    } catch (err) {
      next(err);
    }
  };

  public updateMovie = async (
    req: Request<{ id: Schema.Types.ObjectId }>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const data: IMovie = req.body;
      if (!data) throw new HttpException(errors.EMPTY_DATA.httpCode, errors.EMPTY_DATA.message);
      const id: Schema.Types.ObjectId = req.params.id;
      if (!id) throw new HttpException(errors.MISSING_ID.httpCpde, errors.MISSING_ID.message);
      const movie = await this.moviesService.updateMovie(id, data);
      res.status(success.SUCCESS_PUT).json({ data: movie, message: `Movie` });
    } catch (err) {
      next(err);
    }
  };

  public deleteMovie = async (
    req: Request<{ id: Schema.Types.ObjectId }>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const id: Schema.Types.ObjectId = req.params.id;
      if (!id) throw new HttpException(errors.MISSING_ID.httpCpde, errors.MISSING_ID.message);
      const movie = await this.moviesService.deleteMovie(id);
      res.status(success.SUCCESS_DELETE).json({ data: movie, message: 'Movie deleted' });
    } catch (err) {
      next(err);
    }
  };
}

export default MoviesController;
