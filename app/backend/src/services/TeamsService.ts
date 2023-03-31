import Team from '../database/models/TeamModel';

export default class TeamsService {
  constructor(private teamModel: typeof Team) {}

  public async getAll() {
    const result = await this.teamModel.findAll();
    return result;
  }
}
