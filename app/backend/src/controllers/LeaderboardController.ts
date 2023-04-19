import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  constructor(private _leaderboardService = new LeaderboardService()) { }

  public getPerformance = async (req: Request, res: Response): Promise<Response> => {
    const [result] = await this._leaderboardService.getPerformance(req.baseUrl);
    return res.status(200).json(result);
  };
}
