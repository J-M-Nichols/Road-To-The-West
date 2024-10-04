import { createAsyncThunk } from "@reduxjs/toolkit"
import { consumeFood } from "../resourceSlices/foodSlice/foodSlice"
import { consumePreservedFood } from "../resourceSlices/preservedFoodSlice/preservedFoodSlice"
import { removeSettlers } from "../resourceSlices/settlersSlice/settlersSlice"
import { killCattle } from "../resourceSlices/cattleSlice/cattleSlice"
import { removeWagons } from "../resourceSlices/wagonsSlice/wagonsSlice"
import { advanceDay } from "../seasonsSlice/seasonsSlice"
import { addContent } from "../notificationSlice/notificationSlice"

export const endTurn = createAsyncThunk(
    'game/endTurn',
    async (_, {getState, dispatch})=>{
        const state = getState()
        let settlers = state.settlers
        const food = state.food
        const preservedFood = state.preservedFood
        const {currentEvent} = state.event
        const {dayCount} = state.season
        let foodMessage = ''

        dispatch(advanceDay())

        // Settlers eat food
        let totalFood = Math.floor(settlers * (1+Math.random()))
        let foodNeeded = totalFood
        for(let i = 0; i < food.length && foodNeeded > 0; i++){
            if(food[i].amount <= foodNeeded){
                foodNeeded -= food[i].amount
                dispatch(consumeFood(food[i].amount))
            }
            else {
                dispatch(consumeFood(foodNeeded))
                foodNeeded = 0
            }
        }

        let foodAte = totalFood - foodNeeded
        totalFood -= foodAte
        if(foodAte > 0) foodMessage = `Your settlers ate ${foodAte} food`
  
        let preservedFoodAte = 0
        //settlers eat preserved food if still hungry
        if(foodNeeded > 0){
            for(let i = 0; i < preservedFood.length && foodNeeded > 0; i++){
                if(preservedFood[i].amount <= foodNeeded){
                    foodNeeded -= preservedFood[i].amount
                    dispatch(consumePreservedFood(preservedFood[i].amount))
                }
                else {
                    dispatch(consumePreservedFood(foodNeeded))
                    foodNeeded = 0
                }
            }

            preservedFoodAte = totalFood - foodNeeded
            if(preservedFoodAte > 0) foodMessage += foodAte > 0 ? ` and ${preservedFoodAte} preserved food.` : `Your settlers ate ${preservedFoodAte} preserved food.`
        }

        //settlers die off if still hungry
        if(foodNeeded > 0) {
            dispatch(addContent({
                content: `${foodNeeded} settlers were lost to starvation.`,
                classNames: 'text-danger'
            }))
            dispatch(removeSettlers(foodNeeded))
            settlers -= foodNeeded
        }

        //cattle wander off if lack of settlers
        const cattle = state.cattle
        if(cattle > settlers){
            const cattleLost = cattle - settlers
            dispatch(addContent({
                content:`${cattleLost} cattle wandered off due to a lack of settlers.`,
                classNames: 'text-danger'
            }))
            dispatch(killCattle(cattleLost))
        }

        //wagons left behind if lack of cattle
        const wagons = state.wagons
        if(wagons > cattle){
            const wagonsLost = wagons - cattle
            dispatch(addContent({
                content: `${wagonsLost} wagons had to be left behind because there weren't enough cattle.`,
                classNames: 'text-danger'
            }))
            dispatch(removeWagons(wagonsLost))
        }

        //check food expiration
        let expiredFoodCount = 0
        const foodExpiration = currentEvent.id===2 ? Math.round(1.25 + Math.random())  : 3

        food.forEach(({createdAt, amount})=>{
            const daysOld = dayCount - createdAt

            if(daysOld >= foodExpiration) expiredFoodCount += amount
            else if(daysOld + 1 >= foodExpiration) dispatch(addContent({
                content: `${amount} food will expire soon.`,
                classNames: 'text-warning'
            }))
        })

        expiredFoodCount -= foodAte

        if(expiredFoodCount > 0){
            dispatch(addContent({
                content: `${expiredFoodCount} food has expired.`,
                classNames: 'text-danger'
            }))
            dispatch(consumeFood(expiredFoodCount))
        }

        //check preserved food expiration
        let expiredPreservedFoodCount = 0
        const preservedFoodExpiration = 25 + Math.floor(Math.random() * (currentEvent.id===2 ? 22 : 45))
        preservedFood.forEach(({createdAt, amount})=>{
            const daysOld = dayCount - createdAt

            if(daysOld >= preservedFoodExpiration) expiredPreservedFoodCount += amount
            else if((daysOld + 5) >= preservedFoodExpiration) dispatch(addContent({
                content: `${amount} preserved food will expire soon.`,
                classNames: 'text-warning'
            }))
        })

        expiredPreservedFoodCount -= preservedFoodAte
    
        if(expiredPreservedFoodCount > 0){
            dispatch(addContent({
                content:`${expiredPreservedFoodCount} preserved food has expired.`,
                classNames: 'text-danger'
            }))
            dispatch(consumePreservedFood(expiredPreservedFoodCount))
        }
        dispatch(addContent({
            content: foodMessage,
                classNames: 'text-primary'
        }))
    }
)