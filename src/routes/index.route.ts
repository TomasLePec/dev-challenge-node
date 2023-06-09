import { Router } from 'express';
import { Routes } from '../interfaces/routes.interface';
import { success } from '../success/constants';

class IndexRoute implements Routes {
  public path = '/';
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/`, (req, res) => res.status(success.SUCCESS_GET).json('OK'));
  }
}

export default IndexRoute;
