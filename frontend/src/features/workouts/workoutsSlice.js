// src/features/workouts/workoutsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const react_api_url = process.env.REACT_APP_API_URL 
console.log('react_api_url', react_api_url)
export const fetchWorkouts = createAsyncThunk('workouts/fetchWorkouts', async () => {
  const response = await fetch(`${react_api_url}/api/workouts/`)
  const data = await response.json()
  return data.workouts
})

const workoutsSlice = createSlice({ //set up a global state that can be fetched at initialization and be manipulated later 
  name: 'workouts',
  initialState: {
    items: [],
    status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
    error: null
  },
  reducers: {
    workoutAdded(state, action) {
      state.items.unshift(action.payload) //mongodb also add new element to begin of array, so as state.items should be similar too
    },

    workoutDeleted(state, action) {
        state.items = state.items.filter((e) => e._id !== action.payload._id) 
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchWorkouts.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchWorkouts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchWorkouts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export const { workoutAdded, workoutDeleted } = workoutsSlice.actions

export default workoutsSlice.reducer
