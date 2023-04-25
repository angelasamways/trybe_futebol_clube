import * as express from 'express';
import LeaderboardService from '../services/LeaderboardService';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboardService = new LeaderboardService();

const leaderboardController = new LeaderboardController(leaderboardService);

const leaderBoardRouter = express.Router();

leaderBoardRouter.get('/home', leaderboardController.getHome);
leaderBoardRouter.get('/away', leaderboardController.getAway);

export default leaderBoardRouter;
