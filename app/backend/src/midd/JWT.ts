import 'dotenv/config';
import * as jwt from 'jsonwebtoken';

const signOptions: object = { expiresIn: '7d', algorithm: 'HS256' };
const secret = process.env.JWT_SECRET || 'jwt_secret';

const createToken = (email: string, password: string, role: string) => {
  const payload = { email, password, role };
  const token = jwt.sign(payload, secret, signOptions);
  return token;
};

const validateToken = (token: string) => {
  const verification = jwt.verify(token, secret);
  return verification;
};
export {
  createToken,
  validateToken,
};
