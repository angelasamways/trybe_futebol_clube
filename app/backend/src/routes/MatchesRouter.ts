import { Router, Request, Response } from 'express';
import Matches from '../database/models/MatchesModel';
import MatchesService from '../services/MatchesService';
import MatchesController from '../controllers/MatchesController';
import { isValidToken } from '../midd/middlewares';

const matchesRouter = Router();

const matchesService = new MatchesService(Matches);
const matchesController = new MatchesController(matchesService);

matchesRouter.get(
  '/',
  (req: Request, res: Response) => matchesController.getAll(req, res),
);
matchesRouter.patch(
  '/:id/finish',
  isValidToken,
  (req: Request, res: Response) => matchesController.finishMatch(req, res),
);
matchesRouter.patch(
  '/:id',
  isValidToken,
  (req: Request, res: Response) => matchesController.updateMatch(req, res),
);
matchesRouter.post(
  '/',
  isValidToken,
  (req: Request, res: Response) => matchesController.insertMatch(req, res),
);

export default matchesRouter;
