import {createSlice} from '@reduxjs/toolkit'

const initialState = 1 + Math.floor(Math.random() * 3)

const wagonsSlice = createSlice({
    name:'wagons',
    initialState,
    reducers:{
        addWagons: (state, action)=>state + action.payload,
        removeWagons: (state, action)=>state - action.payload, 
    },
})

export const {addWagons, removeWagons} = wagonsSlice.actions
export default wagonsSlice.reducer