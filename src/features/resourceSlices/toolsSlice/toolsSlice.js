import {createSlice} from '@reduxjs/toolkit'
import { GitHubStorageHandler } from 'github-localstorage-handler'
import trackedPaths from '../../../handlers/trackedPaths'

const defaultTools = 150 + Math.floor(Math.random() * 50)

const toolsHandler = new GitHubStorageHandler(trackedPaths.tools)

const initialState = toolsHandler.getNumber(defaultTools)

const toolsSlice = createSlice({
    name:'tools',
    initialState,
    reducers:{
        addTools: (state, {payload})=>{
            const tools = state + payload
            toolsHandler.setNumber(tools)
            state = tools
            return tools
        },
        removeTools: (state, {payload})=>{
            const tools = state - payload
            toolsHandler.setNumber(tools)
            state = tools
            return tools
        }, 
    },
})

export const {addTools, removeTools} = toolsSlice.actions
export default toolsSlice.reducer