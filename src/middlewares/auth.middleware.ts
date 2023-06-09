import { NextFunction, Request, Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import { AUTH_SECRET } from '../config';
import { HttpException } from '../exceptions/HttpException';
import { errors } from '../errors/constants';

const authMiddleware = async (req: Request<any>, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer '))
      throw new HttpException(
        errors.MISSING_AUTH_TOKEN.httpCode,
        errors.MISSING_AUTH_TOKEN.message,
      );
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const token = authHeader.substring(7, authHeader.length);
    jwt.verify(token, AUTH_SECRET as Secret, (err) => {
      if (err)
        throw new HttpException(
          errors.UNAUTHORIZED_FOR_ACTION.httpCode,
          errors.UNAUTHORIZED_FOR_ACTION.message,
        );
      next();
    });
  } catch (err) {
    next(err);
  }
};

export default authMiddleware;
