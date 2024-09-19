import {createSlice} from '@reduxjs/toolkit'

const initialState = 150 + Math.floor(Math.random() * 50)

const toolsSlice = createSlice({
    name:'tools',
    initialState,
    reducers:{
        addTools: (state, action)=>state + action.payload,
        removeTools: (state, action)=>state - action.payload, 
    },
})

export const {addTools, removeTools} = toolsSlice.actions
export default toolsSlice.reducer