import {createSlice} from '@reduxjs/toolkit'
import { GitHubStorageHandler } from 'github-localstorage-handler'
import trackedPaths from '../../../handlers/trackedPaths'

const defaultPreservedFood = [
    {
        amount: 400 + Math.floor(Math.random() * 150),
        createdAt: 0
    }
]

const preservedFoodHandler = new GitHubStorageHandler(trackedPaths.preservedFood)

//const generatePreservedFood = () => 500 + Math.floor(Math.random() * 50);
const initialState = preservedFoodHandler.getObject(defaultPreservedFood)

const preservedFoodSlice = createSlice({
    name:'preservedFood',
    initialState,
    reducers:{
        addPreservedFood: (state, {payload}) => {
            const {amount, createdAt} = payload
            const newState = state
            newState.push({
                amount,
                createdAt,
            })

            preservedFoodHandler.setObject(newState)

            state = newState
            return newState
        },
        consumePreservedFood: (state, {payload}) => {
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

            preservedFoodHandler.setObject(newState)
            state = newState
            return newState
        },
        checkPreservedFoodExpiration: (state, {payload}) => {
            const {currentDay, rate} = payload
            const newState = state.filter(item=>currentDay - item.createdAt <= rate)

            preservedFoodHandler.setObject(newState)

            console.log('checkPreserved food expiration')

            state = newState
            return newState
        },
    },
})

export const {addPreservedFood, consumePreservedFood, checkPreservedFoodExpiration} = preservedFoodSlice.actions
export default preservedFoodSlice.reducer