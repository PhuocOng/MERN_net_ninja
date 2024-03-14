import { useDispatch } from "react-redux";
import { workoutDeleted } from "../features/workouts/workoutsSlice";
import { formatDistance, subDays } from "date-fns";

const WorkoutDetail = ({ workout }) => {
    

    const dispatch = useDispatch(); 
    const handleClick = async () => {
        const response = await fetch("http://localhost:4000/api/workouts/" + workout._id, {
            method: "DELETE"
        })

        console.log("resonse", response)
        
        const json = await response.json()
        console.log("response.json", json);
        if (response.ok) {
            console.log("the deleted workoiut succesfully in WorkoutDetail.js", json)
            dispatch(workoutDeleted(json.workout))
        }
    }
    
    return (
        <div className = "workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load (kg): </strong>{workout.load}</p>
            <p><strong>Reps: </strong>{workout.reps}</p>
            
            <p>{formatDistance(workout.createdAt, new Date(), { addSuffix: true })}</p>
            <span className = "material-symbols-outlined" onClick = {handleClick}>delete</span>
        </div>
    )
}


export default WorkoutDetail