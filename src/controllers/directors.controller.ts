import { Response, Request, NextFunction } from "express";
import directorsService from "../services/directors.service";
import { IDirector } from "../interfaces/directors.interface";
import { Schema } from "mongoose";
import { HttpException } from "../exceptions/HttpException";

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

  public getDirectorById = async (req: Request<{id: Schema.Types.ObjectId}>, res: Response, next: NextFunction) => {
    try {
      const id: Schema.Types.ObjectId = req.params.id
      if (!id) throw new HttpException(400, 'No id provided');
      const director = await this.directorsService.getDirectorById(id);
      res.status(200).json({data: director, message: 'Director'})
    } catch (err) {
      next(err)
    }
  };

  public createDirector = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: IDirector = req.body;
      if (!data) throw new HttpException(400, 'Data is Empty');
      const directors = await this.directorsService.createDirector(data);
      res.status(201).json({data: directors, message: 'Created'})
    } catch (err) {
      next(err)
    }
  };

  public updateDirector = async (req: Request<{id: Schema.Types.ObjectId}>, res: Response, next: NextFunction) => {
    try {
      const id: Schema.Types.ObjectId = req.params.id;
      if (!id) throw new HttpException(400, 'No id provided');
      const data: IDirector = req.body;
      if (!data) throw new HttpException(400, 'Data is Empty');
      const directors = await this.directorsService.updateDirector(id,data);
      res.status(201).json({data: directors, message: 'Update'})
    } catch (err) {
      next(err)
    }
  };
}

export default DirectorsController;
