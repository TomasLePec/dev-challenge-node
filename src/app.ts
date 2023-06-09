/* eslint-disable @typescript-eslint/no-magic-numbers */
import cors from 'cors';
import express from 'express';
import errorMiddleware from './middlewares/error.middleware';
import { Routes } from './interfaces/routes.interface';
import { connect } from 'mongoose';
import { dbConnection } from './databases';
import { PORT } from './config';

class App {
  public app: express.Application;
  public port: string | number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.port = PORT || 3001;
    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }

  public getServer() {
    return this.app;
  }

  private connectToDatabase() {
    try {
      connect(dbConnection.url, {});
    } catch (err) {
      console.log(err);
    }
  }

  private initializeMiddlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use('/', route.router);
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
