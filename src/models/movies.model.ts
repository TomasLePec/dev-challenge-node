import { model, Schema, Document } from 'mongoose';
import { IMovie } from '../interfaces/movies.interface';

const movieSchema: Schema = new Schema({
  title: {
    type: String,
    require: true,
  },
  gender: {
    type: String,
    require: true,
  },
  director: {
    type: String,
    require: true,
  }
});

const movieModel = model<IMovie & Document>('User', movieSchema);

export default movieModel;
