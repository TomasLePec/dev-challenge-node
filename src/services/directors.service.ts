import { Schema } from 'mongoose';
import { IDirector } from '../interfaces/directors.interface';
import directorsModel from '../models/directors.model';
import { HttpException } from '../exceptions/HttpException';
import { errors } from '../errors/constants';

class directorsService {
  public directors = directorsModel;

  public async getAllDirectors() {
    const directors = await this.directors.find();
    return directors;
  }

  public async getDirectorById(id: Schema.Types.ObjectId) {
    const director = await this.directors.findById(id);
    if (!director) throw new HttpException(errors.NOT_FOUND.httpCode, 'Director not found');
    return director;
  }

  public async createDirector({ name }: IDirector) {
    const director = await this.directors.create({ name: name });
    return director;
  }

  public async updateDirector(id: Schema.Types.ObjectId, data: IDirector) {
    const director = await this.directors.findByIdAndUpdate(id, data);
    if (!director)
      throw new HttpException(errors.RESOURCE_NOT_FOUND.httpCode, "Director doesn't exist");
    return director;
  }
}

export default directorsService;
