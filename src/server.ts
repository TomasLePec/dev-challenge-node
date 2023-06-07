import App from "./app";
import ActorsRoute from "./routes/actors.route";
import DirectorsRoute from "./routes/directors.route";
import MoviesRoute from "./routes/movies.route";

const app = new App([
  new MoviesRoute(),
  new DirectorsRoute(),
  new ActorsRoute()
]);

app.listen();
