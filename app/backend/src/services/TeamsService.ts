import Team from '../database/models/TeamModel';
import ITeam from '../interfaces/ITeam';

export default class TeamsService {
  constructor(private _teamModel: typeof Team) {}

  public async getAll() {
    const result = await this._teamModel.findAll();
    return result;
  }

  public async getById(id: number): Promise<ITeam | null> {
    const result = await this._teamModel.findByPk(id);
    return result as ITeam || null;
  }
}
