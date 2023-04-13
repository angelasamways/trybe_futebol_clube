import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  constructor(private _matchesService: MatchesService) {}

  public getAll = async (req: Request, res: Response) => {
    const result = await this._matchesService.getAll();
    return res.status(200).json(result);
  };
}
