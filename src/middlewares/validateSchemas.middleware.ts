import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';
import { HttpException } from '../exceptions/HttpException';
import { errors } from '../errors/constants';

const validateSchemaMiddleware =
  (schema: Schema) => (req: Request<any>, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);

    if (error) throw new HttpException(errors.EMPTY_DATA.httpCode, error.details[0].message);
    next();
  };

export default validateSchemaMiddleware;
