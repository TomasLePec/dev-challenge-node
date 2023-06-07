import { Schema } from "mongoose";
import { IDirector } from "./directors.interface";
import { IActor } from "./actors.interface";

interface Episode {
  number: number;
  title: string;
  actors: Schema.Types.ObjectId[] | IActor[];
}

interface Season {
  number: number;
  episodes: Episode[];
}

export interface ITVShow {
  title: string;
  director: Schema.Types.ObjectId | IDirector;
  seasons: Season[];
}