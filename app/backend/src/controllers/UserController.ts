import { Request, Response } from 'express';
import UserService from '../services/UserService';

export default class UserController {
  constructor(private _userService: UserService) {}

  public login = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;
    try {
      const token = await this._userService.login(email, password);
      return res.status(200).json({ token });
    } catch (err) {
      return res.status(401).json({ err });
    }
  };
}
