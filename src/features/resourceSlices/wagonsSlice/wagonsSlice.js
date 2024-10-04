import {createSlice} from '@reduxjs/toolkit'
import { GitHubStorageHandler } from 'github-localstorage-handler'
import trackedPaths from '../../../handlers/trackedPaths'

const defaultWagons = 1 + Math.floor(Math.random() * 3)

const wagonsHandler = new GitHubStorageHandler(trackedPaths.wagons)

const initialState = wagonsHandler.getNumber(defaultWagons)

const wagonsSlice = createSlice({
    name:'wagons',
    initialState,
    reducers:{
        addWagons: (state, {payload})=>{
            const wagons = state + payload
            wagonsHandler.setNumber(wagons)
            state = wagons
            return wagons
        },
        removeWagons: (state, {payload})=>{
            const wagons = state - payload
            wagonsHandler.setNumber(wagons)
            state = wagons
            return wagons
        },
    },
})

export const {addWagons, removeWagons} = wagonsSlice.actions
export default wagonsSlice.reducer