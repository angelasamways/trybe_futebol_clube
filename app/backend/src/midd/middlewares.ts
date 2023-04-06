import { NextFunction, Request, Response } from 'express';

export default function validateLogin(req: Request, res: Response, next: NextFunction) {
  const validEmail = /\S+@\S+\.\S+/;

  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ message: 'All fields must be filled' });

  if (
    !validEmail.test(email)) return res.status(401).json({ message: 'Invalid email or password' });

  if (password.length < 6) return res.status(401).json({ message: 'Invalid email or password' });

  next();
}
