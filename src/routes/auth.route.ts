import { Router } from "express";
import { Routes } from "../interfaces/routes.interface";
import authMiddleware from "../middlewares/auth.middleware";
import AuthController from "../controllers/auth.controller";
import validateMiddleware from "../middlewares/validate.middleware";

class AuthRoute implements Routes {
  public path = '/auth';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/generate`,validateMiddleware, this.authController.generate);
    this.router.post(`${this.path}/refresh`, authMiddleware, this.authController.refreshToken)
  }
}

export default AuthRoute;
