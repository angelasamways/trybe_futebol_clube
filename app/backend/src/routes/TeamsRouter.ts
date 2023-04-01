import { Router } from 'express';
import Team from '../database/models/TeamModel';
import TeamsController from '../controllers/TeamsController';
import TeamsService from '../services/TeamsService';

const teamsRouter = Router();

const teamsService = new TeamsService(Team);
const teamsController = new TeamsController(teamsService);

teamsRouter.get('/', (req, res) => teamsController.getAll(req, res));
teamsRouter.get('/:id', (req, res) => teamsController.getById(req, res));

export default teamsRouter;
