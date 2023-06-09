import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';
import { HttpException } from '../exceptions/HttpException';

const validateSchemaMiddleware = (schema: Schema) => {
  return (req: Request<any>, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);

    if (error) throw new HttpException(400, error.details[0].message)
    next();
  };
};

export default validateSchemaMiddleware;