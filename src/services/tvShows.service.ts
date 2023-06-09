import { Schema } from 'mongoose';
import tvShowsModel from '../models/tvShows.model';
import { HttpException } from '../exceptions/HttpException';
import directorModel from '../models/directors.model';
import actorModel from '../models/actors.model';
import { generateTvShows } from '../utils/tvShowsGenerator';
import { TVShowGenerator } from '../interfaces/tvShowGenerator.interface';
import { errors } from '../errors/constants';
class tvShowsService {
  public tvShows = tvShowsModel;
  public directors = directorModel;
  public actors = actorModel;

  public async getAllTVShows() {
    const allTVShows = await this.tvShows.aggregate([
      {
        $lookup: {
          from: 'directors',
          localField: 'director',
          foreignField: '_id',
          as: 'director',
        },
      },
      {
        $project: {
          title: 1,
          director: { $arrayElemAt: ['$director.name', 0] },
          seasons: { $size: '$seasons' },
        },
      },
    ]);
    return allTVShows;
  }

  public async getTVShowById(id: Schema.Types.ObjectId) {
    const tvShow = await this.tvShows.aggregate([
      { $match: { $expr: { $eq: ['$_id', { $toObjectId: `${id}` }] } } },
      {
        $lookup: {
          from: 'directors',
          localField: 'director',
          foreignField: '_id',
          as: 'director',
        },
      },
      { $unwind: '$director' },
      {
        $addFields: {
          seasons: {
            $map: {
              input: '$seasons',
              as: 'season',
              in: {
                number: '$$season.number',
                episodes: { $size: '$$season.episodes' },
              },
            },
          },
        },
      },
    ]);
    if (!tvShow) throw new HttpException(errors.RESOURCE_NOT_FOUND.httpCode, 'TV Show not found');
    return tvShow;
  }

  public async getEpisodeData(id: Schema.Types.ObjectId, season: number, episode: number) {
    const tvShow = await this.tvShows.aggregate([
      {
        $match: { $expr: { $eq: ['$_id', { $toObjectId: `${id}` }] } },
      },
      {
        $lookup: {
          from: 'directors',
          localField: 'director',
          foreignField: '_id',
          as: 'director',
        },
      },
      { $unwind: '$director' },
      {
        $project: {
          title: 1,
          director: 1,
          season: {
            $filter: {
              input: '$seasons',
              as: 'season',
              cond: { $eq: ['$$season.number', { $toInt: `${season}` }] },
            },
          },
        },
      },
      {
        $unwind: '$season',
      },
      {
        $project: {
          title: 1,
          director: 1,
          episode: {
            $filter: {
              input: '$season.episodes',
              as: 'episode',
              cond: { $eq: ['$$episode.number', { $toInt: `${episode}` }] },
            },
          },
        },
      },
      { $unwind: '$episode' },
      {
        $lookup: {
          from: 'actors',
          localField: 'episode.actors',
          foreignField: '_id',
          as: 'episode.actors',
        },
      },
      {
        $project: {
          tvShow: '$title',
          director: 1,
          season: season,
          number: '$episode.number',
          title: '$episode.title',
          actors: '$episode.actors',
        },
      },
    ]);
    if (!tvShow[0])
      throw new HttpException(errors.RESOURCE_NOT_FOUND.httpCode, 'TV Show episode not found');
    return tvShow[0];
  }

  public async createTVShow({ name, seasons, episodes }: TVShowGenerator) {
    const actors = await this.actors.find();
    const directors = await this.directors.find();
    const generateTVShow = generateTvShows(name, seasons, episodes, directors, actors);
    const createTVShow = await this.tvShows.create(generateTVShow);
    return createTVShow;
  }

  public async deleteTVShow(id: Schema.Types.ObjectId) {
    const deletedShow = await this.tvShows.findByIdAndDelete(id);
    if (!deletedShow)
      throw new HttpException(errors.RESOURCE_NOT_FOUND.httpCode, 'TVShow not found');
    return deletedShow;
  }
}

export default tvShowsService;
