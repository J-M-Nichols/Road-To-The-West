import {createSlice} from '@reduxjs/toolkit'

//const generatePreservedFood = () => 500 + Math.floor(Math.random() * 50);
const initialState = [
    {
        amount: 400 + Math.floor(Math.random() * 150),
        createdAt: 0
    }
]

const preservedFoodSlice = createSlice({
    name:'preservedFood',
    initialState,
    reducers:{
        addPreservedFood: (state, action) => {
            const {amount, createdAt} = action.payload
            state.push({
                amount,
                createdAt,
            })
        },
        consumePreservedFood: (state, action) => {
            let amount = action.payload
            while(amount > 0 && state.length > 0){
                if(state[0].amount > amount){
                    state[0].amount -= amount
                    amount = 0
                }
                else {
                    amount -= state[0].amount
                    state.shift()
                }
            }
        },
        checkPreservedFoodExpiration: (state, action) => {
            const {currentDay, rate} = action.payload
            return state.filter(item=>currentDay - item.createdAt <= rate)
        },
    },
})

export const {addPreservedFood, consumePreservedFood, checkPreservedFoodExpiration} = preservedFoodSlice.actions
export default preservedFoodSlice.reducer