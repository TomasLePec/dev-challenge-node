# Development Challenge for Node.js

Challenge made by Tomas Manuel Perez.
REST API.
TypeScript
Node.js
Database: MongoDB
Schema validations: Joi.

## REST API Documentation

This documentation provides information about the REST API. It includes details about the API endpoints, authentication, and any additional information developers need to work with the API.

## Run Project
npm run dev to run locally.

DB_USER and DB_PASSWORD are for connect to MongoDB database.

Environment variables: 
  DB_USER
  DB_PASSWORD
  AUTH_SECRET
  VALIDATION_PASSWORD

## Base URL

The base URL for all API endpoints is: `https://localhost:PORT.com`
If the environment variable PORT is not defined, by default it will be implemented PORT = 3001

## Authentication

I use JWT (https://jwt.io/) to the authentication. In this case, you can get your token that expire un one hour.

### Generate and refresh token:
Generate: POST 'baseURL/auth/generate' body: { "password": --PASSWORD--} where --PASSWORD-- must match with VALIDATION_PASSWORD.
Refresh: POST 'baseURL/auth/refresh' Headers: "Authorization": "Bearer --TOKEN--"

Except generate JWT token endpoint, all request must contain Authorization Header.

## Endpoints

### Actors

#### GET
'/actors' return a list of all the actors on database.
'/actors/id' return the actor that match whit the id.

#### POST
'/actors' Create an actor. body: {"name": --STRING--}

#### PUT
'/actors/id' Update the id match actor. body: {"name": --STRING--}

### Directors

#### GET
'/directors' return a list of all the directors on database.
'/directors/id' return the director that match whit the id.

#### POST
'/directors' Create a director. body: {"name": --STRING--}

#### PUT
'/directors/id' Update the id match director. body: {"name": --STRING--}

### Movies

#### GET
'/movies' return a list of all the movies on database. You can filter and sort by query.
title: filter movies by title. Case sensitive.
orderBy: 'title' | '-title' | 'year' | '-year'

'/movies/id' return the director that match whit the id with the populate data.

#### POST
'/movies' Create a movie.
Body: {
  title: string
  year: number
  director: directorObjectId
  cast: [
    actorObjectId,
    ...
  ],
}

#### PUT
'/movies/id' Update the id match movie.
Body: {
  title: string
  year: number
  director: directorObjectId
  cast: [
    actorObjectId,
    ...
  ],
}

#### DELETE
'/movies/id' delete the id match movie.

### TV Shows

#### GET
'/tvShows' return a list of all the tvShows on database. Show The Title, director, and number of seasons.

'/tvShows/id' return tvShow data that match the id. Show, title, seasons, and number on episodes in each season.

'/tvShows/id/season/episode' id: tvShow objectId, season: number of season, episode: numebr of episode.
Returns that specific episode data.

#### POST
'/tvShows' This endpoint create a TVShow with random director and actors per episode (Max of 5 actors per episode).
Body: {
  name: string;
  seasons: number;
  episodes: number;
}

#### DELETE
'/tvShows/id' delete the id match movie.