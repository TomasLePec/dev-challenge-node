import { Response, Request, NextFunction } from "express";
import tvShowsService from "../services/tvShows.service";
import { Schema } from "mongoose";
import { TVShowGenerator } from "../interfaces/tvShowGenerator.interface";

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

  public getTVShowById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id as unknown as Schema.Types.ObjectId;
      const movie = await this.tvShowsService.getTVShowById(id);
      res.status(200).json({data: movie, message: `TV Show`})
    } catch (err) {
      next(err)
    }
  };

  public getEpisodeData = async (req: Request<{id: Schema.Types.ObjectId, season: number, episode: number}>, res: Response, next: NextFunction) => {
    try {
      const id: Schema.Types.ObjectId = req.params.id;
      const season: number = req.params.season;
      const episode: number = req.params.episode;
      const movie = await this.tvShowsService.getEpisodeData(id, season, episode);
      res.status(200).json({data: movie, message: `TV Show`})
    } catch (err) {
      next(err)
    }
  };

  public createTVShows = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: TVShowGenerator = req.body;
      const createTVShows = await this.tvShowsService.createTVShow(data);
      res.status(201).json({data: createTVShows, message: `TV Show Created`})
    } catch (err) {
      next(err)
    }
  };
}

export default TVShowsController;
