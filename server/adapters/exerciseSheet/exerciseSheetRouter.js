const Router = require('express').Router();

const QueryExerciseSheet = require('../../domains/exerciseSheet/exerciseSheetDomain');

Router.get('/', async (req, res) => {
    let userId = req.query.userId; // TODO: pegar do JWT

    try {
        const EXERCISE_SHEETS = await QueryExerciseSheet.queryUserExerciseSheets(userId);

        res.status(200).json(EXERCISE_SHEETS);
    }
    catch(err) {
        res.status(500).send(err.message);
    }
});

Router.get('/available/:sheetId', async (req, res) => {
    let userId = req.query.userId;
    let type = req.query.type;
    let sheetId = req.params.sheetId;

    try {
        const EXERCISE_SHEETS = await QueryExerciseSheet.queryAvailableExercisesSheet(userId, sheetId, type);

        res.status(200).json(EXERCISE_SHEETS);
    }
    catch(err) {
        res.status(500).send(err.message);
    } 
});

Router.post('/add/:sheetId', async (req, res) => {
    try {
        const EXERCISE_IDS = req.body.exerciseIds;
        const USER_ID = req.query.userId;
        const SHEET_ID = req.params.sheetId;
        await QueryExerciseSheet.createUserExercises(USER_ID, SHEET_ID, EXERCISE_IDS);

        res.status(201).send('Exercícios cadastrados em sua ficha com sucesso!');
    }
    catch(err) {
        res.status(500).send(err.message);
    }
});

Router.put('/:sheetId/update/:exerciseId', async (req, res) => {
    try {
        // expected json request body:
        // {
        //     "time": number | undefined,
        //     "numSets": number | undefined,
        //     "load": undefined | number,
        //     "numRepetitions": undefined | number
        // }
        const USER_EXERCISE_INFO = req.body;
        const SHEET_ID = req.params.sheetId;
        const USER_ID = req.query.userId;
        const EXERCISE_ID = req.params.exerciseId;

        let userExerciseIds = [];
        userExerciseIds['sheetId'] = SHEET_ID;
        userExerciseIds['userId'] = USER_ID;
        userExerciseIds['exerciseId'] = EXERCISE_ID; 
        
        const UPDATE_USER_EXERCISE = await QueryExerciseSheet.updateUserExerciseInfo(userExerciseIds, USER_EXERCISE_INFO);

        res.status(200).json(UPDATE_USER_EXERCISE);
    }
    catch(err) {
        res.status(500).send(err.message);
    }
});

Router.delete('/', async (req, res) => {
    try {
        let userExerciseId = req.query.id;

        await QueryExerciseSheet.deleteUserExercise(userExerciseId);

        res.status(200).send('Exercício de usuário excluído com sucesso.');
    }
    catch(err) {
        res.status(500).send(err.message);
    }
});

module.exports = Router;