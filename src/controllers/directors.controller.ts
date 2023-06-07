import { Response, Request, NextFunction } from "express";
import directorsService from "../services/directors.service";
import { IDirector } from "../interfaces/directors.interface";
import { Schema } from "mongoose";

class DirectorsController {
  public directorsService = new directorsService()

  public getDirectors = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const directors = await this.directorsService.getAllDirectors();
      res.status(200).json({data: directors, message: 'All Directors'})
    } catch (err) {
      next(err)
    }
  };

  public getDirectorById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const directorId = req.params.id as unknown as Schema.Types.ObjectId;
      const director = await this.directorsService.getDirectorById(directorId);
      res.status(200).json({data: director, message: 'Director'})
    } catch (err) {
      next(err)
    }
  };

  public createDirector = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: IDirector = req.body;
      const directors = await this.directorsService.createDirector(data);
      res.status(201).json({data: directors, message: 'Created'})
    } catch (err) {
      next(err)
    }
  };
}

export default DirectorsController;
