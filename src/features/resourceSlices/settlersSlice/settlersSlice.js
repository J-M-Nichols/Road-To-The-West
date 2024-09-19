import {createSlice} from '@reduxjs/toolkit'

const initialState = 3 + Math.floor(Math.random() * 5)

const settlersSlice = createSlice({
    name:'settlers',
    initialState,
    reducers:{
        addSettlers: (state, action)=>state + action.payload,
        removeSettlers: (state, action)=>state - action.payload, 
    },
})

export const {addSettlers, removeSettlers} = settlersSlice.actions
export default settlersSlice.reducer