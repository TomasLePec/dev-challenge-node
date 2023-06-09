import { model, Schema, Document } from 'mongoose';
import { IMovie } from '../interfaces/movies.interface';

export const movieSchema: Schema = new Schema({
  title: {
    type: String,
    require: true,
  },
  year: {
    type: Number,
    require: true,
  },
  director: {
    type: Schema.Types.ObjectId,
    ref: 'directors',
    require: true,
  },
  cast: [
    {
      type: Schema.Types.ObjectId,
      ref: 'actors',
      require: true,
    }
  ]
});

const movieModel = model<IMovie & Document>('movies', movieSchema);

export default movieModel;
