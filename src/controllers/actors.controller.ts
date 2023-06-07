import { Response, Request, NextFunction } from "express";
import actorsService from "../services/actors.service";
import { IActor } from "../interfaces/actors.interface";
import { Schema } from "mongoose";

class ActorsController {
  public actorsService = new actorsService()

  public getActors = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const actors = await this.actorsService.getAllActors();
      res.status(200).json({data: actors, message: 'All Actors'})
    } catch (err) {
      next(err)
    }
  };

  public getActorById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const actorId = req.params.id as unknown as Schema.Types.ObjectId;
      const actor = await this.actorsService.getActorById(actorId);
      res.status(200).json({data: actor, message: 'Actor'})
    } catch (err) {
      next(err)
    }
  };

  public createActor = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: IActor = req.body;
      const actors = await this.actorsService.createActor(data);
      res.status(201).json({data: actors, message: 'Created'})
    } catch (err) {
      next(err)
    }
  };
}

export default ActorsController;
