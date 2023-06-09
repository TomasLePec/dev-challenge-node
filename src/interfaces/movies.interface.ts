import { Schema } from 'mongoose';
import { IDirector } from './directors.interface';
import { IActor } from './actors.interface';

export interface IMovie {
  title: string;
  director: Schema.Types.ObjectId | IDirector;
  cast: Schema.Types.ObjectId[] | IActor[];
}
