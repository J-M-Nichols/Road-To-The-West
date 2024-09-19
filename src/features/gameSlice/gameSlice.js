import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    distanceTraveled: 0,
    gameCompleted: false,
    score: 0,
}

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        updateDistanceTraveled: (state, action) => {
            state.distanceTraveled += action.payload
        },
        checkGameCompletion: (state, action) => {
            if(state.distanceTraveled >= 3000) {
                state.gameCompleted = true
                state.score = calculateScore(action.payload)
            }
        }
    }
})

const calculateScore = ({ settlers, cattle, wagons, food, preservedFood, tools, currentDay }) => {
    const totalResources = settlers + cattle + wagons + tools + food.reduce((total, item) => total + item.amount, 0) + preservedFood.reduce((total, item) => total + item.amount, 0)
    return totalResources - currentDay
}

export const { updateDistanceTraveled, checkGameCompletion } = gameSlice.actions
export default gameSlice.reducer