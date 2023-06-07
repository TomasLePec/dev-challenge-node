import moviesModel from "../models/movies.model";

class moviesService {
  public movies = moviesModel;

  public async getAllMovies() {
    try {
      const movies = await this.movies.find();
      return movies;
    } catch (err) {
      console.log(err)
    }
  }

  public async getMoviesByDirector(director: string) {
    try {
      const movies = await this.movies.find({director: director})
      return movies;
    } catch (err) {
      console.log(err)
    }
  }
};

export default moviesService;
