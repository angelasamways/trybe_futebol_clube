import 'dotenv/config';
import * as jwt from 'jsonwebtoken';

const signOptions: jwt.SignOptions = { expiresIn: '7d', algorithm: 'HS256' };
// const JWT_SECRET = process.env.JWT_SECRET as string;
const secret = process.env.JWT_SECRET || 'jwt_secret';

export default class JWT {
  static createToken(email: string, password: string) {
    const payload = { email, password };
    const token = jwt.sign(payload, secret, signOptions);
    return token;
  }

  static decode(token: string) {
    const verification = jwt.sign(token, secret);
    return verification;
  }
}
