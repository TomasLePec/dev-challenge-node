import { Response, Request, NextFunction } from "express";
import actorsService from "../services/actors.service";
import { IActor } from "../interfaces/actors.interface";
import { Schema } from "mongoose";
import { HttpException } from "../exceptions/HttpException";

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

  public getActorById = async (req: Request<{id: Schema.Types.ObjectId}>, res: Response, next: NextFunction) => {
    try {
      const id: Schema.Types.ObjectId = req.params.id;
      if (!id) throw new HttpException(400, "No id provided")
      const actor = await this.actorsService.getActorById(id);
      res.status(200).json({data: actor, message: 'Actor'})
    } catch (err) {
      next(err)
    }
  };

  public createActor = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: IActor = req.body;
      if (!data) throw new HttpException(400, "data is empty")
      const actors = await this.actorsService.createActor(data);
      res.status(201).json({data: actors, message: 'Created'})
    } catch (err) {
      next(err)
    }
  };

  public updateActor = async (req: Request<{id: Schema.Types.ObjectId}>, res: Response, next: NextFunction) => {
    try {
      const id: Schema.Types.ObjectId = req.params.id;
      if (!id) throw new HttpException(400, "No id provided")
      const data: IActor = req.body;
      if (!data) throw new HttpException(400, "data is empty")
      const actors = await this.actorsService.updateActor(id,data);
      res.status(201).json({data: actors, message: 'Update'})
    } catch (err) {
      next(err)
    }
  }
}

export default ActorsController;
