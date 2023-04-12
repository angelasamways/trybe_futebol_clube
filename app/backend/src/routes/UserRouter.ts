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
  '/role',
  isValidToken,
  (req: Request, res: Response) => userController.tokenValidation(req, res),
);

export default userRouter;
