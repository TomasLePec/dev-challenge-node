import { Response, Request, NextFunction } from 'express';
import directorsService from '../services/directors.service';
import { IDirector } from '../interfaces/directors.interface';
import { Schema } from 'mongoose';
import { HttpException } from '../exceptions/HttpException';
import { success } from '../success/constants';
import { errors } from '../errors/constants';

class DirectorsController {
  public directorsService = new directorsService();

  public getDirectors = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const directors = await this.directorsService.getAllDirectors();
      res.status(success.SUCCESS_GET).json({ data: directors, message: 'All Directors' });
    } catch (err) {
      next(err);
    }
  };

  public getDirectorById = async (
    req: Request<{ id: Schema.Types.ObjectId }>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const id: Schema.Types.ObjectId = req.params.id;
      if (!id) throw new HttpException(errors.MISSING_ID.httpCpde, errors.MISSING_ID.message);
      const director = await this.directorsService.getDirectorById(id);
      res.status(success.SUCCESS_GET).json({ data: director, message: 'Director' });
    } catch (err) {
      next(err);
    }
  };

  public createDirector = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: IDirector = req.body;
      if (!data) throw new HttpException(errors.EMPTY_DATA.httpCode, errors.EMPTY_DATA.message);
      const directors = await this.directorsService.createDirector(data);
      res.status(success.SUCCESS_POST).json({ data: directors, message: 'Created' });
    } catch (err) {
      next(err);
    }
  };

  public updateDirector = async (
    req: Request<{ id: Schema.Types.ObjectId }>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const id: Schema.Types.ObjectId = req.params.id;
      if (!id) throw new HttpException(errors.MISSING_ID.httpCpde, errors.MISSING_ID.message);
      const data: IDirector = req.body;
      if (!data) throw new HttpException(errors.EMPTY_DATA.httpCode, errors.EMPTY_DATA.message);
      const directors = await this.directorsService.updateDirector(id, data);
      res.status(success.SUCCESS_POST).json({ data: directors, message: 'Update' });
    } catch (err) {
      next(err);
    }
  };
}

export default DirectorsController;
