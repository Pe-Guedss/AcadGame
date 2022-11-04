const ExerciseDBAdapter = require('../../adapters/exercise/exerciseDBAdapter');

class QueryExerciseDB {
    async getAllExercises() {
        try {
            let returnExercises = [];
            
            const QUERIED_EXERCISES = await ExerciseDBAdapter.findAllExercises();

            QUERIED_EXERCISES.forEach( exercise =>  {
                returnExercises.push(exercise.dataValues);
            });

            return returnExercises;
        }
        catch (err) {
            throw err;
        }
    }

    async getOneExercise(id) {
        try {
            const QUERIED_EXERCISE = await ExerciseDBAdapter.findOneExercise(id);

            return QUERIED_EXERCISE.dataValues;
        } 
        catch(err) {
            throw err;
        }
    }

    async getExerciseByType(type) {
        try {
            const QUERIED_EXERCISES = await ExerciseDBAdapter.findExerciseByType(type);

            let returnValues = [];
            QUERIED_EXERCISES.forEach(queriedExercise => {
                returnValues.push(queriedExercise).dataValues;
            });

            return returnValues;
        }
        catch(err) {
            throw err;
        }
    }

    async getExercisesByName(name) {
        try {
            const QUERIED_EXERCISES = await ExerciseDBAdapter.findExercisesByName(name);

            let returnValues = [];
            QUERIED_EXERCISES.forEach(queriedExercise => {
                returnValues.push(queriedExercise).dataValues;
            });
            
            return returnValues;
        }
        catch(err) {
            throw err;
        }
    }
}

module.exports = new QueryExerciseDB;