import { Router } from 'express';
import Matches from '../database/models/MatchesModel';
import MatchesService from '../services/MatchesService';
import MatchesController from '../controllers/MatchesController';
import { isValidToken } from '../midd/middlewares';

const matchesRouter = Router();

const matchesService = new MatchesService(Matches);
const matchesController = new MatchesController(matchesService);

matchesRouter.get('/', (req, res) => matchesController.getAll(req, res));
matchesRouter.patch(
  '/:id/finish',
  isValidToken,
  (req, res) => matchesController.finishMatch(req, res),
);

export default matchesRouter;
