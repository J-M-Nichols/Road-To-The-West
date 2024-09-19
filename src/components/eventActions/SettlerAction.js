import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { consumeFood } from "../../features/resourceSlices/foodSlice/foodSlice"
import { consumePreservedFood } from "../../features/resourceSlices/preservedFoodSlice/preservedFoodSlice"
import { addSettlers } from "../../features/resourceSlices/settlersSlice/settlersSlice"
import { gainCattle } from "../../features/resourceSlices/cattleSlice/cattleSlice"
import { addTools } from "../../features/resourceSlices/toolsSlice/toolsSlice"
import { addWagons } from "../../features/resourceSlices/wagonsSlice/wagonsSlice"
import { decrementTime } from "../../features/eventSlice/eventSlice"
import { addContent } from "../../features/notificationSlice/notificationSlice"

/**
 * id: 4
 * 100% chance to trade 50-150 food for a settler : 3 - 5 settlers avalaible per interaction
 * 25% chance to accept the whole caravan containing 5-10% of starting resources
 * 
 * Trading does not advance the day
 * Disapears after selecting an option
 */
const SettlerAction = () => {    
    const dispatch = useDispatch()
    const hasWholeCaravan = Math.random() < 0.25
    const settlerCount = 1 + Math.floor(Math.random() * 2)
    let foodCost = (50 + Math.floor(Math.random() * 100)) * settlerCount
    const food = useSelector(state=>state.food).reduce((total, item)=>total+item.amount, 0)
    const preservedFood = useSelector(state=>state.preservedFood).reduce((total, item)=>total+item.amount, 0)
    const canTradeFood = (food + preservedFood) >= foodCost

    const tradeFoodForSettlers = () => {
        let baseFoodCost = foodCost

        if(food > 0){
            if(food > foodCost){
                dispatch(consumeFood(foodCost))
                foodCost = 0
            } else{
                foodCost -= food
                dispatch(consumeFood(food))
            }
        }
        
        const spentOnFood = baseFoodCost - foodCost
        
        if(spentOnFood > 0){
            //spent money on food and preserved food
            if(foodCost > 0){
                dispatch(addContent(`You traded ${spentOnFood} food and ${foodCost} preserved food for ${settlerCount} settlers.`))
            }
            //all money spent on food
            else{
                dispatch(addContent(`You traded ${spentOnFood} food for ${settlerCount} settlers.`))
            }
        }
        //all money spent on preserved food
        else{
            dispatch(addContent(`You traded ${foodCost} preserved food for ${settlerCount} settlers.`))
        }

        if(foodCost > 0){
            dispatch(consumePreservedFood(foodCost))
        }

        dispatch(addSettlers(settlerCount))

        dispatch(decrementTime())
    }

    const acceptWholeCaravan = () => {
        const caravanResources = {
            cattle: Math.round(Math.random() * 2),//0-2
            settlers: settlerCount,
            tools: 10+Math.floor(Math.random() * 90),//10-100
            wagons:Math.round(Math.random() * 2),//0-2
        }

        dispatch(addContent(`You accepted the whole caravan of ${caravanResources.cattle>0?`${caravanResources.cattle} cattle, `:''}${caravanResources.wagons>0?`${caravanResources.wagons} wagons, `:''}${caravanResources.settlers} settlers and ${caravanResources.tools} tools.`))

        dispatch(gainCattle(caravanResources.cattle))
        dispatch(addSettlers(caravanResources.settlers))
        dispatch(addTools(caravanResources.tools))
        dispatch(addWagons(caravanResources.wagons))

        dispatch(decrementTime())
    }

    return (
        (canTradeFood || hasWholeCaravan) ?
            <section 
                className="d-flex flex-wrap justify-content-around w-100"
                aria-label="Encounter With Settlers"
            >
                { canTradeFood && 
                    <button 
                        type="button"
                        className="btn btn-success"
                        onClick={tradeFoodForSettlers}
                    >Trade {foodCost} food for {settlerCount} settlers.</button>
                }
                { hasWholeCaravan &&
                    <button
                        type="button"
                        className="btn btn-success" 
                        onClick={acceptWholeCaravan}
                    >Accept the whole caravan.</button>
                }
            </section>
        : <></>
    )
}

export default SettlerAction