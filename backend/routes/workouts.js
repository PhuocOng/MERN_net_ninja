const express = require('express')
const {
    getAllWorkouts,
    getSingleWorkout, 
    createWorkout,
    deleteWorkout, 
    updateWorkout
} = require('../controllers/workoutController.js')
const router = express.Router()

//GET all workouts
router.get('/', getAllWorkouts)

//GET one workout 
router.get('/:id', getSingleWorkout)

//POST a new workout 
router.post('/', createWorkout)

//DELETE a workout 
router.delete('/:id', deleteWorkout)

//UPDATE a workout
router.patch('/:id', updateWorkout)

module.exports = router