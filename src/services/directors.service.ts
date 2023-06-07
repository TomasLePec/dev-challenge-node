import { Schema } from "mongoose";
import { IDirector } from "../interfaces/directors.interface";
import directorsModel from "../models/directors.model";

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
};

export default directorsService;
