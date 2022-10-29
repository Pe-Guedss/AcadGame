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

Router.put('/', async (req, res) => {
    try {
        let userExerciseInfo = req.body;
        const USER_EXERCISE_ID = req.body.id;
        delete userExerciseInfo.id;
        
        await QueryExerciseSheet.updateUserExerciseInfo(USER_EXERCISE_ID, userExerciseInfo);

        res.status(200).send('Exercício de usuário atualizado com sucesso!');
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