import { createSlice } from "@reduxjs/toolkit"
import { GitHubStorageHandler } from "github-localstorage-handler"
import trackedPaths from "../../handlers/trackedPaths"

const defaultEvent = {
    currentEvent: {name:''},
    timeLeft: 0,
}

const eventHandler = new GitHubStorageHandler(trackedPaths.event)

const initialState = eventHandler.getObject(defaultEvent)

const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers:{
        startEvent: (state, {payload}) => {
            const newState = state
            newState.currentEvent = payload.currentEvent
            newState.timeLeft = payload.timeLeft

            eventHandler.setObject(newState)
            state = newState
            return newState
        },
        decrementTime: (state)=>{
            const newState = state
            newState.timeLeft -= 1

            eventHandler.setObject(newState)
            state = newState
            return newState
        }
    }
})

export const {startEvent, decrementTime} = eventSlice.actions
export default eventSlice.reducer