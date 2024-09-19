import {createSlice} from '@reduxjs/toolkit'

const initialState=[]

const foodSlice = createSlice({
    name:'food',
    initialState,
    reducers:{
        addFood: (state, action)=>{
            const {amount, createdAt} = action.payload
            state.push({
                amount,
                createdAt,
            })
        },
        consumeFood: (state, action)=>{
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
        }
    },
})

export const {addFood, consumeFood} = foodSlice.actions
export default foodSlice.reducer