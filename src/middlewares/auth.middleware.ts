import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from 'jsonwebtoken';
import { AUTH_SECRET } from "../config";
import { HttpException } from "../exceptions/HttpException";

const authMiddleware = async (req: Request<any>, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) throw new HttpException(403,"No token provided!");
    const token = authHeader.substring(7, authHeader.length);
    jwt.verify(token,AUTH_SECRET as Secret, (err) => {
      if (err) throw new HttpException(401,"Unauthorized!")
      next();
    });
  } catch (err) {
    next(err)
  }
};

export default authMiddleware;
