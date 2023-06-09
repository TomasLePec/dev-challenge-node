import { Schema } from "mongoose";
import { IActor } from "../interfaces/actors.interface";
import actorsModel from "../models/actors.model";
import { HttpException } from "../exceptions/HttpException";

class actorsService {
  public actors = actorsModel;

  public async getAllActors() {
    try {
      const actors = await this.actors.find();
      return actors;
    } catch (err) {
      throw err
    }
  }

  public async getActorById(id: Schema.Types.ObjectId) {
    try {
      const actor = await this.actors.findById(id);
      if (!actor) throw new HttpException(404, "Actor not found")
      return actor;
    } catch (err) {
      throw err
    }
  }

  public async createActor({ name }: IActor) {
    try {
      const actor = await this.actors.create({name: name})
      return actor;
    } catch (err) {
      throw err
    }
  }

  public async updateActor(id: Schema.Types.ObjectId, data: IActor) {
    try {
      const actorUpdate = await this.actors.findByIdAndUpdate(id, data);
      if (!actorUpdate) throw new HttpException(404, "Actor not found");
      return actorUpdate
    } catch (err) {
      throw err
    }
  }
};

export default actorsService;
