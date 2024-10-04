import {createSlice} from '@reduxjs/toolkit'
import { GitHubStorageHandler } from 'github-localstorage-handler'
import trackedPaths from '../../../handlers/trackedPaths'

const foodHandler = new GitHubStorageHandler(trackedPaths.food)

const initialState=foodHandler.getObject([])

const foodSlice = createSlice({
    name:'food',
    initialState,
    reducers:{
        addFood: (state, {payload})=>{
            const {amount, createdAt} = payload
            const newState = state
            newState.push({
                amount,
                createdAt,
            })

            foodHandler.setObject(newState)

            state = newState
            return newState
        },
        consumeFood: (state, {payload})=>{
            let amount = payload
            const newState = state

            while(amount > 0 && newState.length > 0){
                if(newState[0].amount > amount){
                    newState[0].amount -= amount
                    amount = 0
                }
                else {
                    amount -= newState[0].amount
                    newState.shift()
                }
            }

            foodHandler.setObject(newState)
            state = newState
            return newState
        }
    },
})

export const {addFood, consumeFood} = foodSlice.actions
export default foodSlice.reducer