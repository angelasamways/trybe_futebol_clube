import { Router } from 'express';
import Matches from '../database/models/MatchesModel';
import MatchesService from '../services/MatchesService';
import MatchesController from '../controllers/MatchesController';

const matchesRouter = Router();

const matchesService = new MatchesService(Matches);
const matchesController = new MatchesController(matchesService);

matchesRouter.get('/', (req, res) => matchesController.getAll(req, res));

export default matchesRouter;
