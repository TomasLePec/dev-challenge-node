import { Schema } from "mongoose";
import { Episode, ITVShow, Season } from "../interfaces/tvShows.interface";
import { IDirector } from "../interfaces/directors.interface";
import { IActor } from "../interfaces/actors.interface";

function getRandomActors(actors: any[]) {
  const numActors = Math.ceil(Math.random() * 5);
  const episodeActors = [];
  const shuffledActors = actors.sort(() => Math.random() - 0.5);
  for (let i = 0; i < numActors; i++) {
    episodeActors.push(shuffledActors[i]._id);
  }
  return episodeActors;
}

function generateEpisodes(numberOfEpisodes: number, actors: any[]) {
  const episodes = [];
  for (let i = 0; i < numberOfEpisodes; i++) {
    episodes.push({
      number: i + 1,
      title: `Episode ${i + 1}`,
      actors: getRandomActors(actors)
  });
}
  return episodes;
}

function generateSeasons(numberOfSeasons: number, numberOfEpisodes: number, actors: any[]) {
  const seasons = [];
  for (let i = 0; i < numberOfSeasons; i++) {
    seasons.push({
      number: i +1,
      episodes: generateEpisodes(numberOfEpisodes, actors) as unknown as Episode[]
  });
}
  return seasons;
}

export function generateTvShows(name: string, seasons: number, episodes: number, directors: any[], actors: any[]) {
  const tvShow: ITVShow = {
    title: name,
    director: directors[(Math.random()*directors.length)]._id as unknown as Schema.Types.ObjectId,
    seasons: generateSeasons(seasons, episodes, actors)
  }
  return tvShow;
}