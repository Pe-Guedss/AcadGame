const Router = require('express').Router();
const authMiddleware = require('../../middlewares/auth');

const DayScore = require('../../domains/dayScore/dayScoreDomain');

Router.use(authMiddleware);

Router.get('/', async (req, res) => {
    try {
        const USER_ID = req.userId;

        const DAY_SCORES = await DayScore.getUserDayScores(USER_ID);

        res.status(200).json(DAY_SCORES);
    }
    catch(err) {
        res.status(500).send(err.message);
    }
});

Router.get('/user/last7days', async (req, res) => {
    try {
        const USER_ID = req.userId;

        const LAST_7_DAYS_SCORES = await DayScore.getLast7DaysScores(USER_ID);

        res.status(200).json(LAST_7_DAYS_SCORES);
    }
    catch(err) {
        res.status(500).send(err.message);
    }
});

Router.post('/user/add', async (req, res) => {
    try {
        const USER_ID = req.userId;
        const SENT_EXERCISES_INFO = req.body;

        await DayScore.createDailyScore(USER_ID, SENT_EXERCISES_INFO);

        res.status(201).send('Pontuações diárias cadastradas com sucesso!');
    }
    catch(err) {
        res.status(500).send(err.message);
    }
});

Router.get('/weekPodium', async (req, res) => {
    try {
        const WEEK_PODIUM = await DayScore.getWeekPodium();

        res.status(200).json(WEEK_PODIUM);
    }
    catch(err) {
        res.status(500).send(err.message);
    }
})

module.exports = Router;