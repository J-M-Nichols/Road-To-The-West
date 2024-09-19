import {createSlice} from '@reduxjs/toolkit'

const initialState = 1 + Math.floor(Math.random() * 3)

const cattleSlice = createSlice({
    name:'cattle',
    initialState,
    reducers:{
        killCattle: (state, action) => state - action.payload,
        gainCattle: (state, action) => state + action.payload,
    },
})

export const {killCattle, gainCattle} = cattleSlice.actions
export default cattleSlice.reducer