// import { ModelStatic } from 'sequelize';
import bCryptMid from '../midd/BCrypt';
import { createToken } from '../midd/JWT';
import UserModel from '../database/models/UserModel';
import HTTPError from '../errors/HTTPErrors';
import ILogin from '../interfaces/ILogin';

const erro401 = 'Incorrect email or password';
export default class UserService {
  // protected model: ModelStatic<UserModel> = UserModel;
  constructor(private _userModel: typeof UserModel) {}

  public async login(email: string, password: string, role: string): Promise<string> {
    const user = await this._userModel.findOne({ where: { email } });

    if (!email || !password) throw new HTTPError(400, 'All fields must be filled');

    if (user === null) throw new HTTPError(401, erro401);

    if (email !== user.email) throw new HTTPError(401, erro401);

    const passwordValid = bCryptMid.comparePassword(password, user.password);
    const token = createToken(email, password, role);

    if (!passwordValid) throw new HTTPError(401, erro401);

    return token;
  }

  public async validationToken(email: string): Promise<ILogin> {
    const result = await this._userModel.findOne({ where: { email } });
    return result as ILogin;
  }
}
