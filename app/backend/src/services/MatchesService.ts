import TeamModel from '../database/models/TeamModel';
import Matches from '../database/models/MatchesModel';
import IScoreboard from '../interfaces/IScoreboard';
import IMatch from '../interfaces/IMatch';
import HTTPError from '../errors/HTTPErrors';

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

  public async getInProgress(inProgress: boolean) {
    return this._matchesModel.findAll({
      include: [
        { model: TeamModel, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: TeamModel, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
      where: { inProgress },
    });
  }

  public async finishMatch(id: number) {
    await this._matchesModel.update({ inProgress: false }, { where: { id } });
  }

  public async updateMatch(id: number, scoreboard: IScoreboard) {
    const { homeTeamGoals, awayTeamGoals } = scoreboard;
    await this._matchesModel.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  }

  public async insertMatch(scoreboard: IMatch): Promise<IMatch> {
    const homeIdTeamModel = await TeamModel.findByPk(scoreboard.homeTeamId);
    const awayIdTeamModel = await TeamModel.findByPk(scoreboard.awayTeamId);

    if (!homeIdTeamModel || !awayIdTeamModel) {
      throw new HTTPError(404, 'There is no team with such id!');
    }
    if (scoreboard.homeTeamId === scoreboard.awayTeamId) {
      throw new HTTPError(422, 'It is not possible to create a match with two equal teams');
    }
    return this._matchesModel.create({ ...scoreboard, inProgress: true });
  }
}
