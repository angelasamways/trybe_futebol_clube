import { NextFunction, Request, Response } from 'express';
import { validateToken } from './JWT';

function isValidLogin(req: Request, res: Response, next: NextFunction) {
  const validEmail = /\S+@\S+\.\S+/;

  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ message: 'All fields must be filled' });

  if (
    !validEmail.test(email)) return res.status(401).json({ message: 'Invalid email or password' });

  if (password.length < 6) return res.status(401).json({ message: 'Invalid email or password' });

  next();
}

function isValidToken(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  try {
    if (!authorization) return res.status(401).json({ message: 'Token not found' });
    const isValid = validateToken(authorization);
    res.locals.user = isValid;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
}

export {
  isValidLogin,
  isValidToken,
};
