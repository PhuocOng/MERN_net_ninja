import {useState} from "react"
import { useDispatch } from 'react-redux'
import { workoutAdded } from "../features/workouts/workoutsSlice";

const WorkoutForm = () => {
    const [title, setTitle] = useState('');
    const [load, setLoad] = useState('');
    const [reps, setReps] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]); 
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const workout = {title, load, reps};
        const response = await fetch('http://localhost:4000/api/workouts/', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json();
        console.log("json, after submitting workout", json)
        if (!response.ok) {
            setError(json.error);
            setEmptyFields(json.emptyFields)
            console.log("error is:", error);
        }

        if (response.ok) {
            setTitle('')
            setLoad('')
            setReps('')
            setError(null)
            dispatch(workoutAdded(json.workout))
            console.log("new workout added", json);

        }
    }
    return (
        <form className = "create" onSubmit = {handleSubmit}>
            <h3>Add A New Workout</h3>

            <label>Exercise Title: </label>
            <input
                type = "text"
                onChange = {(e) => setTitle(e.target.value)}
                value = {title}
                className = {emptyFields.includes(title) ? "error" : ""} />

            <label>Load (in Kg): </label>
            <input
                type = "number"
                onChange = {(e) => setLoad(e.target.value)}
                value = {load}
                className = {emptyFields.includes(load) ? "error" : ""}/>

            <label>Rep: </label>
            <input
                type = "number"
                onChange = {(e) => setReps(e.target.value)}
                value = {reps}
                className = {emptyFields.includes(reps) ? "error" : ""}/>

            
            <button>Add workout</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default WorkoutForm;