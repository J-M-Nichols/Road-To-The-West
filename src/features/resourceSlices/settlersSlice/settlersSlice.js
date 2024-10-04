import {createSlice} from '@reduxjs/toolkit'
import { GitHubStorageHandler } from 'github-localstorage-handler'
import trackedPaths from '../../../handlers/trackedPaths'

const defaultSettlers = 3 + Math.floor(Math.random() * 5)

const settlersHandler = new GitHubStorageHandler(trackedPaths.settlers)

const initialState = settlersHandler.getNumber(defaultSettlers)

const settlersSlice = createSlice({
    name:'settlers',
    initialState,
    reducers:{
        addSettlers: (state, {payload})=>{
            const settlers = state + payload
            settlersHandler.setNumber(settlers)
            state = settlers
            return settlers
        },
        removeSettlers: (state, {payload})=>{
            const settlers = state - payload
            settlersHandler.setNumber(settlers)
            state = settlers
            return settlers
        }, 
    },
})

export const {addSettlers, removeSettlers} = settlersSlice.actions
export default settlersSlice.reducer