import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  constructor(private _leaderboardService = new LeaderboardService()) { }

  getHome = async (_req: Request, res: Response) => {
    try {
      const [results] = await this._leaderboardService.getHome();

      return res.status(200).json(results);
    } catch (error) {
      return error;
    }
  };
}
