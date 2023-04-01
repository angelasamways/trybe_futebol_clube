import Team from '../database/models/TeamModel';
import ITeam from '../interfaces/ITeam';

export default class TeamsService {
  constructor(private teamModel: typeof Team) {}

  public async getAll() {
    const result = await this.teamModel.findAll();
    return result;
  }

  public async getById(id: number): Promise<ITeam | null> {
    const result = await this.teamModel.findByPk(id);
    return result as ITeam || null;
  }
}
