import { Request, Response } from 'express';
import TeamsService from '../services/TeamsService';

export default class TeamsController {
  constructor(private _teamsService: TeamsService) {}

  public getAll = async (_req: Request, res: Response) => {
    const result = await this._teamsService.getAll();
    return res.status(200).json(result);
  };

  public getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) return res.status(404).json({ message: 'id não encontrado' });
    const idNumber = parseInt(id, 10);
    const result = await this._teamsService.getById(idNumber);
    if (!result) return res.status(404).json({ message: 'usuário não existente' });
    return res.status(200).json(result);
  };
}
