import { Router } from 'express';
import UserController from '../controllers/UserController';
import validateLogin from '../midd/middlewares';
import UserService from '../services/UserService';
import UserModel from '../database/models/UserModel';

const userRouter = Router();
const usersService = new UserService(UserModel);
const userController = new UserController(usersService);

userRouter.post('/', validateLogin, (req, res) => userController.login(req, res));

export default userRouter;
