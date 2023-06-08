import { Schema } from "mongoose";
import { IDirector } from "./directors.interface";
import { IActor } from "./actors.interface";

export interface Episode {
  number: number;
  title: string;
  actors: Schema.Types.ObjectId[] | IActor[];
}

export interface Season {
  number: number;
  episodes: Episode[] | number;
}

export interface ITVShow {
  title: string;
  director: Schema.Types.ObjectId | IDirector;
  seasons: Season[] | number;
}