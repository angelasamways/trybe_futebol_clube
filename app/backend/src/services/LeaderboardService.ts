import { ModelStatic } from 'sequelize';
import MatchesModel from '../database/models/MatchesModel';
import ILeaderBoard from '../interfaces/ILeaderBoard';
import queryHome from '../helpers/allQueries';

export default class LeaderBoardService {
  private _matchesModel: ModelStatic<MatchesModel> = MatchesModel;

  getHome = async (): Promise<ILeaderBoard[]> => {
    const leaderboardHome = await this._matchesModel.sequelize?.query(
      queryHome,
    );
    return leaderboardHome as ILeaderBoard[];
  };
}
