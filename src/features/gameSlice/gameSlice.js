import { createSlice } from "@reduxjs/toolkit"
import { GitHubStorageHandler } from "github-localstorage-handler"
import trackedPaths from "../../handlers/trackedPaths"

const defaultGame = {
    distanceTraveled: 0,
    gameCompleted: false,
    score: 0,
}

const gameHandler = new GitHubStorageHandler(trackedPaths.game)

const initialState = gameHandler.getObject(defaultGame)

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        updateDistanceTraveled: (state, {payload}) => {
            const newState = state
            newState.distanceTraveled += payload

            gameHandler.setObject(newState)
            state = newState
            return newState
        },
        checkGameCompletion: (state, {payload}) => {
            const newState = state

            if(newState.distanceTraveled >= 3000) {
                newState.gameCompleted = true
                newState.score = calculateScore(payload)

                gameHandler.setObject(newState)
                state = newState
            }

            return newState
        }
    }
})

const calculateScore = ({ settlers, cattle, wagons, food, preservedFood, tools, currentDay }) => {
    const totalResources = settlers + cattle + wagons + tools + food.reduce((total, item) => total + item.amount, 0) + preservedFood.reduce((total, item) => total + item.amount, 0)
    return totalResources - currentDay
}

export const { updateDistanceTraveled, checkGameCompletion } = gameSlice.actions
export default gameSlice.reducer