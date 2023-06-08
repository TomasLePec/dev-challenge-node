import { Schema, Types } from "mongoose";
import tvShowsModel from "../models/tvShows.model";
import { ITVShow } from "../interfaces/tvShows.interface";
import { HttpException } from "../exceptions/HttpException";
import directorModel from "../models/directors.model";
import actorModel from "../models/actors.model";
import directorsService from "./directors.service";
import actorsService from "./actors.service";
import { generateTvShows } from "../utils/tvShowsGenerator";
import { TVShowGenerator } from "../interfaces/tvShowGenerator.interface";

class tvShowsService {
  public tvShows = tvShowsModel;
  public directors = directorModel;
  public actors = actorModel;

  public async getAllTVShows() {
    try {
      const allTVShows = await this.tvShows.aggregate([
        {
          $lookup: {
            from: 'directors',
            localField: 'director',
            foreignField: '_id',
            as: 'director'
          }
        },
        {
          $project: {
            title: 1,
            director: { $arrayElemAt: ['$director.name', 0] },
            seasons: { $size: '$seasons' }
          }
        }
      ]);
      return allTVShows;
    } catch (err) {
      throw err
    }
  }

  public async getTVShowById(id: Schema.Types.ObjectId) {
    try {
      const tvShow = await this.tvShows.aggregate([
        { $match: { $expr : { $eq: [ '$_id' , { $toObjectId: `${id}` } ] } } },
        {
          $lookup: {
            from: 'directors',
            localField: 'director',
            foreignField: '_id',
            as: 'director'
          }
        },
        {$unwind: '$director'},
        {
          $addFields: {
            seasons: {
              $map: {
                input: '$seasons',
                as: 'season',
                in: {
                  number: '$$season.number',
                  episodes: { $size: '$$season.episodes' }
                }
              }
            }
          }
        }
      ]);
      if (!tvShow) throw new HttpException(409, "The ID not belongs to any tvShow")
      return tvShow;
    } catch (err) {
      throw err
    }
  }

  public async getEpisodeData(id: Schema.Types.ObjectId, season: number, episode: number) {
    try {
      const tvShow = await this.tvShows.aggregate([
        {
          $match: { $expr : { $eq: [ '$_id' , { $toObjectId: `${id}` } ] } } ,
        },
        {
          $lookup: {
            from: 'directors',
            localField: 'director',
            foreignField: '_id',
            as: 'director'
          }
        },
        { $unwind: '$director'},
        {
          $project: {
            title: 1,
            director: 1,
            season: {
              $filter: {
                input: "$seasons",
                as: "season",
                cond: {$eq: ["$$season.number", {$toInt: `${season}`}]}
              }
            }
          }
        },
        {
          $unwind: "$season"
        },
        {
          $project: {
            title: 1,
            director: 1,
            episode: {
              $filter: {
                input: "$season.episodes",
                as: "episode",
                cond: { $eq: ["$$episode.number", {$toInt: `${episode}`}] }
              }
            }
          },
        },
        {$unwind: '$episode',},
        {
          $lookup: {
            from: 'actors',
            localField: 'episode.actors',
            foreignField: '_id',
            as: 'episode.actors',
          }
        },
        {
          $project: {
            tvShow: '$title',
            director: 1,
            season: season,
            number: '$episode.number',
            title: '$episode.title',
            actors: '$episode.actors' 
          }
        }
      ])
      if (!tvShow[0]) throw new HttpException(404, "TV Show episode not found")
      return tvShow[0];
    } catch (err) {
      throw err
    }
  }

  public async createTVShow({name, seasons, episodes}: TVShowGenerator) {
    try {
      const actors = await this.actors.find();
      const directors = await this.directors.find();
      const generateTVShow = generateTvShows(name, seasons, episodes, directors, actors);
      const createTVShow = await this.tvShows.create(generateTVShow);
    } catch (err) {
      throw err
    }
  }
};

export default tvShowsService;
