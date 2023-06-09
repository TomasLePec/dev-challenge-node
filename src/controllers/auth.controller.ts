import { Response, Request, NextFunction } from 'express';
import authService from '../services/auth.service';
import { success } from '../success/constants';

class AuthController {
  public authService = new authService();

  public generate = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authToken = await this.authService.generate();
      res.status(success.SUCCESS_POST).json({ data: authToken, message: 'Token generate.' });
    } catch (err) {
      next(err);
    }
  };

  public refreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newToken = await this.authService.refreshToken();
      res
        .status(success.SUCCESS_POST)
        .json({ data: newToken, message: 'New Token generate. Expires in one hour.' });
    } catch (err) {
      next(err);
    }
  };
}

export default AuthController;
