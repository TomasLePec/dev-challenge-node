import { Schema } from "mongoose";
import { IDirector } from "../interfaces/directors.interface";
import directorsModel from "../models/directors.model";
import { HttpException } from "../exceptions/HttpException";

class directorsService {
  public directors = directorsModel;

  public async getAllDirectors() {
    try {
      const directors = await this.directors.find();
      return directors;
    } catch (err) {
      throw err
    }
  }

  public async getDirectorById(id: Schema.Types.ObjectId) {
    try {
      const director = await this.directors.findById(id);
      if (!director) throw new HttpException(404, "Director not found")
      return director;
    } catch (err) {
      throw err
    }
  }

  public async createDirector({ name }: IDirector) {
    try {
      const director = await this.directors.create({name: name})
      return director;
    } catch (err) {
      throw err
    }
  }

  public async updateDirector(id: Schema.Types.ObjectId ,data: IDirector) {
    try {
      const director = await this.directors.findByIdAndUpdate(id, data)
      if (!director) throw new HttpException(409, "Director doesn't exist");
      return director;
    } catch (err) {
      throw err
    }
  }
};

export default directorsService;
