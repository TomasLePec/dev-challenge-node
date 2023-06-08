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
      console.log(err)
    }
  }

  public async getDirectorById(id: Schema.Types.ObjectId) {
    try {
      const director = await this.directors.findById(id);
      return director;
    } catch (err) {
      console.log(err)
    }
  }

  public async createDirector({ name }: IDirector) {
    try {
      const director = await this.directors.create({name: name})
      return director;
    } catch (err) {
      console.log(err)
    }
  }

  public async updateDirector(id: Schema.Types.ObjectId ,data: IDirector) {
    try {
      if (!data) throw new HttpException(400, 'Data is Empty');
      const director = await this.directors.findByIdAndUpdate(id, data)
      if (!director) throw new HttpException(409, "Director doesn't exist");
      return director;
    } catch (err) {
      console.log(err)
    }
  }
};

export default directorsService;
