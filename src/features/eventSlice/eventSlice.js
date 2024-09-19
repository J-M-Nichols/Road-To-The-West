import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    currentEvent: {name:''},
    timeLeft: 0,
}

const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers:{
        startEvent: (state, action) => {
            state.currentEvent = action.payload.currentEvent
            state.timeLeft = action.payload.timeLeft
        },
        decrementTime: (state)=>{
            state.timeLeft -= 1
        }
    }
})

export const {startEvent, decrementTime} = eventSlice.actions
export default eventSlice.reducer