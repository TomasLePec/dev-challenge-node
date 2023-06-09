import jwt, { Secret } from 'jsonwebtoken';
import { AUTH_SECRET } from '../config';

class actorsService {
  public async generate() {
    try {
      const token = jwt.sign({},AUTH_SECRET as Secret, {
        expiresIn: 3600 // 1 hour.
      });
      return token;
    } catch (err) {
      throw err
    }
  }

  public async refreshToken() {
    try {
      const token = jwt.sign({},AUTH_SECRET as Secret, {
        expiresIn: 3600 // 1 hour.
      });
      return token;
    } catch (err) {
      throw err
    }
  }
};

export default actorsService;
