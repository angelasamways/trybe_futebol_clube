import { Request, Response } from 'express';
import UserService from '../services/UserService';

export default class UserController {
  constructor(private _userService: UserService) {}

  public login = async (req: Request, res: Response): Promise<Response> => {
    const { email, password, role } = req.body;
    try {
      const token = await this._userService.login(email, password, role);
      return res.status(200).json({ token });
    } catch (err) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  };

  tokenValidation = async (req: Request, res: Response) => {
    const { token: { email } } = req.body;
    const user = await this._userService.validationToken(email);
    return res.status(200).json({ role: user.role });
  };
}
