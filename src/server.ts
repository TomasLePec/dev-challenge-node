import App from "./app";
import MoviesRoute from "./routes/movies.route";

const app = new App([
  new MoviesRoute()
]);

app.listen();
