import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    currentSeason: 'Spring',
    dayCount: 0,
}

const seasonsSlice = createSlice({
    name: 'seasons',
    initialState,
    reducers:{
        advanceDay: (state) => {
            state.dayCount += 1
            if(state.dayCount % 90 === 0) state.currentSeason = getNextSeason(state.currentSeason)
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