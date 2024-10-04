import {createSlice} from '@reduxjs/toolkit'
import { GitHubStorageHandler } from 'github-localstorage-handler'
import trackedPaths from '../../../handlers/trackedPaths'

const defaultCattle = 1 + Math.floor(Math.random() * 3)

const cattleHandler = new GitHubStorageHandler(trackedPaths.cattle)

const initialState = cattleHandler.getNumber(defaultCattle)

const cattleSlice = createSlice({
    name:'cattle',
    initialState,
    reducers:{
        killCattle: (state, {payload}) => {
            const cattle = state - payload
            cattleHandler.setNumber(cattle)
            state = cattle
            return cattle
        },
        gainCattle: (state, {payload}) => {
            const cattle = state + payload
            cattleHandler.setNumber(cattle)
            state = cattle
            return cattle
        },
    },
})

export const {killCattle, gainCattle} = cattleSlice.actions
export default cattleSlice.reducer