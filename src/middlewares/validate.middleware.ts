import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exceptions/HttpException";
import { VALIDATION_PASSWORD } from "../config";

const validateMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatePassword = req.body.password;
    if (!validatePassword) throw new HttpException(400, "No password provided.")
    if (validatePassword !== VALIDATION_PASSWORD) throw new HttpException(401, "Invalid password.")
    next();
  } catch (err) {
    next(err)
  }
};

export default validateMiddleware;
