import { Response, Request, NextFunction } from "express";
import tvShowsService from "../services/tvShows.service";
import { Schema } from "mongoose";
import { TVShowGenerator } from "../interfaces/tvShowGenerator.interface";
import { HttpException } from "../exceptions/HttpException";

class TVShowsController {
  public tvShowsService = new tvShowsService()

  public getTVShows = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tvShows = await this.tvShowsService.getAllTVShows();
      res.status(200).json({data: tvShows, message: 'All TV Shows'})
    } catch (err) {
      next(err)
    }
  };

  public getTVShowById = async (req: Request<{id: Schema.Types.ObjectId}>, res: Response, next: NextFunction) => {
    try {
      const id: Schema.Types.ObjectId = req.params.id;
      if (!id) throw new HttpException(400, "No id provided")
      const movie = await this.tvShowsService.getTVShowById(id);
      res.status(200).json({data: movie, message: `TV Show`})
    } catch (err) {
      next(err)
    }
  };

  public getEpisodeData = async (req: Request<{id: Schema.Types.ObjectId, season: number, episode: number}>, res: Response, next: NextFunction) => {
    try {
      const id: Schema.Types.ObjectId = req.params.id;
      if (!id) throw new HttpException(400, "No id provided")
      const season: number = req.params.season;
      if (!season) throw new HttpException(400, "No season number provided")
      const episode: number = req.params.episode;
      if (!episode) throw new HttpException(400, "No episode number provided")
      const movie = await this.tvShowsService.getEpisodeData(id, season, episode);
      res.status(200).json({data: movie, message: `TV Show`})
    } catch (err) {
      next(err)
    }
  };

  public createTVShow = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: TVShowGenerator = req.body;
      if (!data) throw new HttpException(400, "data is empty")
      const createTVShows = await this.tvShowsService.createTVShow(data);
      res.status(201).json({data: createTVShows, message: `TV Show Created`})
    } catch (err) {
      next(err)
    }
  };

  public deleteTVShow = async (req: Request<{id: Schema.Types.ObjectId}>, res: Response, next: NextFunction) => {
    try {
      const id: Schema.Types.ObjectId = req.params.id;
      if (!id) throw new HttpException(400, "No id provided")
      const deleteShow = await this.tvShowsService.deleteTVShow(id);
      res.status(201).json({data: deleteShow, message: `TV Show Deleted`})
    } catch (err) {
      next(err)
    }
  };
}

export default TVShowsController;
