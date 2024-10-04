import { createSlice } from "@reduxjs/toolkit"
import { GitHubStorageHandler } from "github-localstorage-handler"
import trackedPaths from "../../handlers/trackedPaths"

const defaultSeason = {
    currentSeason: 'Spring',
    dayCount: 0,
}

const seasonHandler = new GitHubStorageHandler(trackedPaths.season)

const initialState = seasonHandler.getObject(defaultSeason)

const seasonsSlice = createSlice({
    name: 'seasons',
    initialState,
    reducers:{
        advanceDay: (state) => {
            const newState = state
            newState.dayCount += 1

            if(newState.dayCount % 30 === 0) {
                newState.currentSeason = getNextSeason(newState.currentSeason)
            }

            seasonHandler.setObject(newState)
            state = newState
            return newState
        }
    }
})

const getNextSeason = (currentSeason)=>{
    const seasons = ['Spring', 'Summer', 'Fall', 'Winter']
    const currentIndex = seasons.indexOf(currentSeason)
    return seasons[(currentIndex+1)%seasons.length]
}

export const {advanceDay} = seasonsSlice.actions
export default seasonsSlice.reducer