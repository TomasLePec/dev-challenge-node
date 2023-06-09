import { NextFunction, Request, Response } from 'express';
import { HttpException } from '../exceptions/HttpException';
import { VALIDATION_PASSWORD } from '../config';
import { errors } from '../errors/constants';

const validateMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatePassword = req.body.password;
    if (!validatePassword)
      throw new HttpException(errors.MISSING_ID.httpCpde, 'No password provided.');
    if (validatePassword !== VALIDATION_PASSWORD)
      throw new HttpException(errors.UNAUTHORIZED_FOR_ACTION.httpCode, 'Invalid password.');
    next();
  } catch (err) {
    next(err);
  }
};

export default validateMiddleware;
