import { useEffect, useState } from 'react'

//components 
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'
import { useDispatch, useSelector } from 'react-redux'
import { fetchWorkouts } from '../features/workouts/workoutsSlice'

const Home = () => {

    // const [workouts, setWorkouts] = useState(null)
    const dispatch = useDispatch();
    const workouts = useSelector(state => state.workouts.items)
    

    useEffect(() => {
        dispatch(fetchWorkouts())
        
      }, [dispatch])


    return (
        <div className = "home">
            <div className = "workouts">
                {workouts && workouts.map((workout) => ( //when workout exists => mapping begin
                    <WorkoutDetails workout = {workout} key = {workout._id}  />
                ))}
            </div>
            <WorkoutForm/>
        </div>
    )
}

export default Home