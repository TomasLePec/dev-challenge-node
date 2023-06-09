import { model, Schema, Document } from 'mongoose';
import { ITVShow } from '../interfaces/tvShows.interface';

const episodeSchema = new Schema({
  number: {
    type: Number,
    require: true,
  },
  title: {
    type: String,
    required: true
  },
  actors: [
    {
      type: Schema.Types.ObjectId,
      ref: 'actors'
    }
  ]
});

const seasonSchema = new Schema({
  number: {
    type: Number,
    required: true
  },
  episodes: [episodeSchema]
});

const tvShowSchema: Schema = new Schema({
  title: {
    type: String,
    required: true
  },
  director: {
    type: Schema.Types.ObjectId,
    ref: 'directors',
    required: true
  },
  seasons: [seasonSchema],
});

const tvShowModel = model<ITVShow & Document>('tvshows', tvShowSchema);

export default tvShowModel;
