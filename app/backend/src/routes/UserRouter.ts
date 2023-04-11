import { Router, Request, Response } from 'express';
import UserController from '../controllers/UserController';
import { isValidLogin, isValidToken } from '../midd/middlewares';
import UserService from '../services/UserService';
import UserModel from '../database/models/UserModel';

const userRouter = Router();
const usersService = new UserService(UserModel);
const userController = new UserController(usersService);

userRouter.post(
  '/',
  isValidLogin,
  (req: Request, res: Response) => userController.login(req, res),
);
userRouter.get(
  '/:role',
  isValidToken,
  (_req: Request, res: Response) => res.status(200).json({ role: res.locals.user.role }),
);

export default userRouter;
