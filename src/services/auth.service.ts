import jwt, { Secret } from 'jsonwebtoken';
import { AUTH_SECRET } from '../config';

class actorsService {
  public async generate() {
    const token = jwt.sign({}, AUTH_SECRET as Secret, {
      expiresIn: 3600, // 1 hour.
    });
    return token;
  }

  public async refreshToken() {
    const token = jwt.sign({}, AUTH_SECRET as Secret, {
      expiresIn: 3600, // 1 hour.
    });
    return token;
  }
}

export default actorsService;
