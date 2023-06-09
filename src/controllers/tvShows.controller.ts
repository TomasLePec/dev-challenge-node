import { Response, Request, NextFunction } from 'express';
import tvShowsService from '../services/tvShows.service';
import { Schema } from 'mongoose';
import { TVShowGenerator } from '../interfaces/tvShowGenerator.interface';
import { HttpException } from '../exceptions/HttpException';
import { success } from '../success/constants';
import { errors } from '../errors/constants';

class TVShowsController {
  public tvShowsService = new tvShowsService();

  public getTVShows = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tvShows = await this.tvShowsService.getAllTVShows();
      res.status(success.SUCCESS_GET).json({ data: tvShows, message: 'All TV Shows' });
    } catch (err) {
      next(err);
    }
  };

  public getTVShowById = async (
    req: Request<{ id: Schema.Types.ObjectId }>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const id: Schema.Types.ObjectId = req.params.id;
      if (!id) throw new HttpException(errors.MISSING_ID.httpCpde, errors.MISSING_ID.message);
      const movie = await this.tvShowsService.getTVShowById(id);
      res.status(success.SUCCESS_GET).json({ data: movie, message: `TV Show` });
    } catch (err) {
      next(err);
    }
  };

  public getEpisodeData = async (
    req: Request<{ id: Schema.Types.ObjectId; season: number; episode: number }>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const id: Schema.Types.ObjectId = req.params.id;
      if (!id) throw new HttpException(errors.MISSING_ID.httpCpde, errors.MISSING_ID.message);
      const season: number = req.params.season;
      if (!season) throw new HttpException(errors.MISSING_ID.httpCpde, 'No season number provided');
      const episode: number = req.params.episode;
      if (!episode)
        throw new HttpException(errors.MISSING_ID.httpCpde, 'No episode number provided');
      const movie = await this.tvShowsService.getEpisodeData(id, season, episode);
      res.status(success.SUCCESS_GET).json({ data: movie, message: `TV Show` });
    } catch (err) {
      next(err);
    }
  };

  public createTVShow = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: TVShowGenerator = req.body;
      if (!data) throw new HttpException(errors.EMPTY_DATA.httpCode, errors.EMPTY_DATA.message);
      const createTVShows = await this.tvShowsService.createTVShow(data);
      res.status(success.SUCCESS_POST).json({ data: createTVShows, message: `TV Show Created` });
    } catch (err) {
      next(err);
    }
  };

  public deleteTVShow = async (
    req: Request<{ id: Schema.Types.ObjectId }>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const id: Schema.Types.ObjectId = req.params.id;
      if (!id) throw new HttpException(errors.MISSING_ID.httpCpde, errors.MISSING_ID.message);
      const deleteShow = await this.tvShowsService.deleteTVShow(id);
      res.status(success.SUCCESS_DELETE).json({ data: deleteShow, message: `TV Show Deleted` });
    } catch (err) {
      next(err);
    }
  };
}

export default TVShowsController;
