import TeamModel from '../database/models/TeamModel';
import Matches from '../database/models/MatchesModel';

export default class MatchesService {
  constructor(private _matchesModel: typeof Matches) {}

  public async getAll() {
    const result = await this._matchesModel.findAll({
      include: [
        { model: TeamModel, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: TeamModel, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return result;
  }
}
