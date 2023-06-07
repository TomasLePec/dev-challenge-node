import { Schema } from "mongoose";
import { IActor } from "../interfaces/actors.interface";
import actorsModel from "../models/actors.model";

class actorsService {
  public actors = actorsModel;

  public async getAllActors() {
    try {
      const actors = await this.actors.find();
      return actors;
    } catch (err) {
      console.log(err)
    }
  }

  public async getActorById(id: Schema.Types.ObjectId) {
    try {
      const actor = await this.actors.findById(id);
      return actor;
    } catch (err) {
      console.log(err)
    }
  }

  public async createActor({ name }: IActor) {
    try {
      const actor = await this.actors.create({name: name})
      return actor;
    } catch (err) {
      console.log(err)
    }
  }
};

export default actorsService;
