import { Schema } from "mongoose";
import moviesModel from "../models/movies.model";
import { IMovie } from "../interfaces/movies.interface";
import { HttpException } from "../exceptions/HttpException";
import directorModel from "../models/directors.model";
import actorModel from "../models/actors.model";
import directorsService from "./directors.service";
import actorsService from "./actors.service";

class moviesService {
  public movies = moviesModel;
  public directors = directorModel;
  public actors = actorModel;

  public async getAllMovies(filter?: any, sort?: any) {
    try {
      const movies = await this.movies.find(filter).sort(sort);
      return movies;
    } catch (err) {
      throw err
    }
  }

  public async getMovieById(id: Schema.Types.ObjectId) {
    try {
      const movie = await this.movies.findById(id).populate('director').populate('cast');
      if (!movie) throw new HttpException(409, "Movie doesn't exist")
      return movie;
    } catch (err) {
      throw err
    }
  }

  public async createMovie(data: IMovie) {
    try {
      const directorId = data.director as Schema.Types.ObjectId;
      const directorExist = await new directorsService().getDirectorById(directorId) // Check if the Director exists.
      if (!directorExist) throw new HttpException(422, "The director does not exist");
      const actorsCount = await this.actors.countDocuments({ _id: { $in: data.cast } }) // Check if all actors exist.
      if (actorsCount !== data.cast.length) throw new HttpException(422, "Actor not exist on database")
      const movie = await this.movies.create(data);
      return movie;
    } catch (err) {
      throw err
    }
  }

  public async updateMovie(id: Schema.Types.ObjectId, data: IMovie) {
    try {
      const directorId = data.director as Schema.Types.ObjectId;
      if (data.director) {
        const directorExist = await new directorsService().getDirectorById(directorId) // Check if the Director exists.
        if (!directorExist) throw new HttpException(422, "The director does not exist");
      }
      if (data.cast) {
        const actorsCount = await this.actors.countDocuments({ _id: { $in: data.cast } }) // Check if all actors exist.
        if (actorsCount !== data.cast.length) throw new HttpException(422, "Actor not exist on database")
      }
      const movie = await this.movies.findByIdAndUpdate(id, data);
      return movie;
    } catch (err) {
      throw err
    }
  }

  public async deleteMovie(id: Schema.Types.ObjectId) {
    try {
      const movieDelete = await this.movies.findByIdAndDelete(id);
      if (!movieDelete) throw new HttpException(409, "Movie doesn't exist");
      return movieDelete;
    } catch (err) {
      throw err
    }
  }
};

export default moviesService;
