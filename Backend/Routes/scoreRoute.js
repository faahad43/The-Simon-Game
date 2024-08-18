import express from 'express'
import {updateHighestScore} from '../Controllers/updateHighestScore.js'
import { getHighestScore } from '../Controllers/getHighestScore.js';
import { getLeaderboard } from '../Controllers/leaderboardController.js';

const router = express.Router();

router.post('/updateScore', updateHighestScore);
router.get('/getHighestScore',getHighestScore);
router.get('/leaderboard', getLeaderboard);


export default router;
