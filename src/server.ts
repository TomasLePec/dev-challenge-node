import App from './app';
import ActorsRoute from './routes/actors.route';
import AuthRoute from './routes/auth.route';
import DirectorsRoute from './routes/directors.route';
import MoviesRoute from './routes/movies.route';
import TVShowsRoute from './routes/tvShows.route';

const app = new App([
  new MoviesRoute(),
  new DirectorsRoute(),
  new ActorsRoute(),
  new TVShowsRoute(),
  new AuthRoute(),
]);

app.listen();
