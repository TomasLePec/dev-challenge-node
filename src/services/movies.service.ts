import { Schema } from 'mongoose';
import moviesModel from '../models/movies.model';
import { IMovie } from '../interfaces/movies.interface';
import { HttpException } from '../exceptions/HttpException';
import directorModel from '../models/directors.model';
import actorModel from '../models/actors.model';
import directorsService from './directors.service';
import { errors } from '../errors/constants';

class moviesService {
  public movies = moviesModel;
  public directors = directorModel;
  public actors = actorModel;

  public async getAllMovies(filter?: any, sort?: any) {
    const movies = await this.movies.find(filter).sort(sort);
    return movies;
  }

  public async getMovieById(id: Schema.Types.ObjectId) {
    const movie = await this.movies.findById(id).populate('director').populate('cast');
    if (!movie) throw new HttpException(errors.RESOURCE_NOT_FOUND.httpCode, "Movie doesn't exist");
    return movie;
  }

  public async createMovie(data: IMovie) {
    const directorId = data.director as Schema.Types.ObjectId;
    const directorExist = await new directorsService().getDirectorById(directorId); // Check if the Director exists.
    if (!directorExist)
      throw new HttpException(errors.RESOURCE_NOT_FOUND.httpCode, 'The director does not exist');
    const actorsCount = await this.actors.countDocuments({ _id: { $in: data.cast } }); // Check if all actors exist.
    if (actorsCount !== data.cast.length)
      throw new HttpException(errors.RESOURCE_NOT_FOUND.httpCode, 'Actor not exist on database');
    const movie = await this.movies.create(data);
    return movie;
  }

  public async updateMovie(id: Schema.Types.ObjectId, data: IMovie) {
    const directorId = data.director as Schema.Types.ObjectId;
    if (data.director) {
      const directorExist = await new directorsService().getDirectorById(directorId); // Check if the Director exists.
      if (!directorExist)
        throw new HttpException(errors.RESOURCE_NOT_FOUND.httpCode, 'The director does not exist');
    }
    if (data.cast) {
      const actorsCount = await this.actors.countDocuments({ _id: { $in: data.cast } }); // Check if all actors exist.
      if (actorsCount !== data.cast.length)
        throw new HttpException(errors.RESOURCE_NOT_FOUND.httpCode, 'Actor not exist on database');
    }
    const movie = await this.movies.findByIdAndUpdate(id, data);
    return movie;
  }

  public async deleteMovie(id: Schema.Types.ObjectId) {
    const movieDelete = await this.movies.findByIdAndDelete(id);
    if (!movieDelete)
      throw new HttpException(errors.RESOURCE_NOT_FOUND.httpCode, "Movie doesn't exist");
    return movieDelete;
  }
}

export default moviesService;
