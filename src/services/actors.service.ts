import { Schema } from 'mongoose';
import { IActor } from '../interfaces/actors.interface';
import actorsModel from '../models/actors.model';
import { HttpException } from '../exceptions/HttpException';
import { errors } from '../errors/constants';

class actorsService {
  public actors = actorsModel;

  public async getAllActors() {
    const actors = await this.actors.find();
    return actors;
  }

  public async getActorById(id: Schema.Types.ObjectId) {
    const actor = await this.actors.findById(id);
    if (!actor) throw new HttpException(errors.NOT_FOUND.httpCode, 'Actor not found');
    return actor;
  }

  public async createActor({ name }: IActor) {
    const actor = await this.actors.create({ name: name });
    return actor;
  }

  public async updateActor(id: Schema.Types.ObjectId, data: IActor) {
    const actorUpdate = await this.actors.findByIdAndUpdate(id, data);
    if (!actorUpdate) throw new HttpException(errors.NOT_FOUND.httpCode, 'Actor not found');
    return actorUpdate;
  }
}

export default actorsService;
