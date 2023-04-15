import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';
import HTTPError from '../errors/HTTPErrors';

export default class MatchesController {
  constructor(private _matchesService: MatchesService) {}

  public getAll = async (req: Request, res: Response) => {
    if (req.query.inProgress) {
      const resultProgress = await this._matchesService
        .getInProgress(JSON.parse(req.query.inProgress as string));
      return res.status(200).json(resultProgress);
    }
    const result = await this._matchesService.getAll();
    return res.status(200).json(result);
  };

  public finishMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this._matchesService.finishMatch(+id);
    return res.status(200).json({ message: 'Finished' });
  };

  public updateMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this._matchesService.updateMatch(+id, { ...req.body });
    return res.status(200).json({ message: 'Finished' });
  };

  public insertMatch = async (req: Request, res: Response) => {
    try {
      const result = await this._matchesService.insertMatch({ ...req.body });
      return res.status(201).json(result);
    } catch (err: unknown) {
      if (err instanceof HTTPError) {
        return res.status(err.statusCode).json({ message: err.message });
      }
    }
  };
}
