import App from "./app";
import DirectorsRoute from "./routes/directors.route";
import MoviesRoute from "./routes/movies.route";

const app = new App([
  new MoviesRoute(),
  new DirectorsRoute(),
]);

app.listen();
