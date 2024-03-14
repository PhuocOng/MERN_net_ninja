const Workout = require('../models/workoutModel.js')
const mongoose = require('mongoose')


//get all workout 
const getAllWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1})
    return res.status(200).json({workouts})
}


//get a single workout
const getSingleWorkout = async (req, res) => {
    const {id} = req.params 
    
    if (!mongoose.Types.ObjectId.isValid(id)) { //check id valid or not
        return res.status(404).json({error: "No such workout"})
    }
    
    const workout = await Workout.findById(id)
    if (!workout) {
        return res.status(404).json({error: "No such workout"})
    }
    
    return res.status(200).json({workout}) 
}

//create new workout
const createWorkout = async (req, res) => {
    const {title, load, reps} = req.body

    let emptyFields = [];
    if (!title) {
        emptyFields.push(title)
    }
    if (!load) {
        emptyFields.push(load)
    }
    if (!reps) {
        emptyFields.push(reps)
    }

    if (emptyFields.length > 0) {
        return res.status(400).json({ error : 'Please fill these fields', emptyFields })
    }
    //add data to db
    try {
        const workout = await Workout.create({title, load, reps})
        return res.status(200).json({workout})
    } catch (error) {
        return res.status(400).json({error : error.message})
    }
}

//delete a workout 
const deleteWorkout = async (req, res) => {
    const { id } = req.params; 
    if (!mongoose.Types.ObjectId.isValid(id)) { //check id valid or not
        return res.status(404).json({error: "No such workout"})
    } 

    const workout = await Workout.findOneAndDelete({_id : id});
    if (!workout) {
        return res.status(404).json({error: "No such workout!"})
    }
    return res.status(200).json({workout}); 
}

//update a workout 
const updateWorkout = async (req, res) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(400).json({error: "No such workout"}) 

    const workout = await Workout.findOneAndUpdate({_id : id}, {
        ...req.body
    }) 

    if (!workout) {
        return res.status(404).json({error: "No such workout!"})
    }
    return res.status(200).json({workout});
}



module.exports = {
    getAllWorkouts,
    getSingleWorkout,
    createWorkout,
    deleteWorkout, 
    updateWorkout
}