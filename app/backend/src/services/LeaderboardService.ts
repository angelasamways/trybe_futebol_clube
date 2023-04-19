import { ModelStatic } from 'sequelize';
import matchesModel from '../database/models/MatchesModel';
import ILeaderBoard from '../interfaces/ILeaderBoard';
import { queryAll, queryHome } from '../helpers/allQueries';

export default class LeaderBoardService {
  private _MatchesModel: ModelStatic<matchesModel> = matchesModel;

  public async getPerformance(url: string):Promise<ILeaderBoard[]> {
    if (url === '/leaderboard/home') {
      const leaderboardHome = await this._MatchesModel.sequelize?.query(
        queryHome,
      );
      return leaderboardHome as ILeaderBoard[];
    }
    const leaderboard = await this._MatchesModel.sequelize?.query(
      queryAll,
    );

    return leaderboard as ILeaderBoard[];
  }
}
