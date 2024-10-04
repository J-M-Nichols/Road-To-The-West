import { useDispatch, useSelector } from "react-redux"
import { endTurn } from "../features/endTurn/endTurn"
import { checkForNewEvent } from "../features/eventSlice/checkForNewEvent"
import { addFood, consumeFood } from "../features/resourceSlices/foodSlice/foodSlice"
import { addPreservedFood } from "../features/resourceSlices/preservedFoodSlice/preservedFoodSlice"
import { killCattle } from "../features/resourceSlices/cattleSlice/cattleSlice"
import { updateDistanceTraveled, checkGameCompletion } from "../features/gameSlice/gameSlice"
import { addContent } from "../features/notificationSlice/notificationSlice"

const ActionButtons = () => {
    const dispatch = useDispatch()
    const settlers = useSelector(state=>state.settlers)
    const wagons = useSelector(state=>state.wagons)
    const food = useSelector(state=>state.food)
    const cattle = useSelector(state=>state.cattle)
    const preservedFood = useSelector(state=>state.preservedFood)
    const tools = useSelector(state=>state.tools)
    const {dayCount} = useSelector(state=>state.season)
    const {currentEvent, timeLeft} = useSelector(state=>state.event)

    const handleTravel = () => {
        let travelMultiplier = 1

        if(timeLeft>0){
            if(currentEvent.id===0) travelMultiplier = 0.5
            else if(currentEvent.id===6) travelMultiplier = 0.8
        }

        const {distance, message} = calculateTravelDistance(settlers, wagons, food, preservedFood, tools, travelMultiplier) 
        dispatch(updateDistanceTraveled(distance))

        dispatch(addContent({
            content: `${message}You travelled ${distance} miles today.`,
            classNames: 'text-primary'
        }))

        dispatch(endTurn())
        dispatch(checkGameCompletion({
            settlers,
            cattle,
            wagons,
            food,
            preservedFood,
            tools,
            currentDay: dayCount
        }))
        dispatch(checkForNewEvent(true))
    }

    const handlePreserveFood = () => {
        let foodToPreserve = 300 + Math.floor(Math.random() * 200)

        if(settlers < 10) {
            const reduceAmount = settlers/10
            foodToPreserve = Math.floor(foodToPreserve * reduceAmount)
        }
        if(foodToPreserve > food) foodToPreserve = food

        if(foodToPreserve > 0){
            dispatch(addPreservedFood({
                amount: foodToPreserve,
                createdAt: dayCount
            }))
            dispatch(consumeFood(foodToPreserve))
        }

        if(foodToPreserve > 0){
            dispatch(addContent({
                content: `You preserved ${foodToPreserve} food.`,
                classNames: 'text-primary'
            }))
        }else{
            dispatch(addContent({
                content: 'You do not have enough food to preserve.',
                classNames: 'text-danger'
            }))
        }

        dispatch(endTurn())
        dispatch(checkForNewEvent(false))
    }

    const handleKillCattle = () => {
        let gainAmount = 500+Math.floor(Math.random() * 750)

        if(settlers < 10) {
            const reduceAmount = settlers/10
            gainAmount = Math.floor(gainAmount * reduceAmount)
        }

        if(cattle > 0){
            dispatch(killCattle(1))
            dispatch(addFood({
                amount: gainAmount,
                createdAt: dayCount
            }))
            dispatch(addContent({
                content: `You killed 1 cattle and gained ${gainAmount} food.`,
                classNames: 'text-success'
            }))
        }
        else dispatch(addContent({
            content: 'You do not have any cattle to turn into food.',
            classNames: 'text-danger'
        }))

        dispatch(endTurn())
        dispatch(checkForNewEvent(false))
    }

    const calculateTravelDistance = (settlers, wagons, food, preservedFood, tools, travelMultiplier) => {
        //wagons can hold 2000 units
        //settlers can hols 500
        //settlers count as 250 units
        //food counts as 1 unit
        //tools count as 20 unit

        let totalWagonSpace = wagons*2000
        let totalSettlerSpace = settlers * 500
        const baseSettlerSpace = totalSettlerSpace

        //start with food
        let foodWeight = food.reduce((total, value)=>total + value.amount, 0)

        if(totalWagonSpace > 0){
            if(foodWeight < totalWagonSpace) totalWagonSpace -= foodWeight
            else {
                foodWeight -= totalWagonSpace
                totalWagonSpace = 0

                if (foodWeight > totalSettlerSpace) {
                    return {
                        distance: 0,
                        message: 'Your caravan has too many resources and cannot move forward.'
                    }
                }
                else {
                    totalSettlerSpace -= foodWeight
                }
            }
        }
        else{
            if (foodWeight > totalSettlerSpace) {
                return {
                    distance: 0,
                    message: 'Your caravan has too many resources and cannot move forward.'
                }
            }
            else {
                totalSettlerSpace -= foodWeight
            }
        }

        //Next with preservedFood
        let preservedFoodWeight = preservedFood.reduce((total, value)=>total + value.amount, 0)

        if(totalWagonSpace > 0){
            if(preservedFoodWeight < totalWagonSpace) totalWagonSpace -= preservedFoodWeight
            else {
                preservedFoodWeight -= totalWagonSpace
                totalWagonSpace = 0

                if (preservedFoodWeight > totalSettlerSpace) {
                    return {
                        distance: 0,
                        message: 'Your caravan has too many resources and cannot move forward.'
                    }
                }
                else {
                    totalSettlerSpace -= preservedFoodWeight
                }
            }
        }
        else{
            if (preservedFoodWeight > totalSettlerSpace) {
                return {
                    distance: 0,
                    message: 'Your caravan has too many resources and cannot move forward.'
                }
            }
            else {
                totalSettlerSpace -= preservedFoodWeight
            }
        }

        //Next with tools        
        if(totalWagonSpace > 0){
            if(tools < totalWagonSpace) totalWagonSpace -= tools
            else {
                tools -= totalWagonSpace
                totalWagonSpace = 0

                if (tools > totalSettlerSpace) {
                    return {
                        distance: 0,
                        message: 'Your caravan has too many resources and cannot move forward.'
                    }
                }
                else {
                    totalSettlerSpace -= tools
                }
            }
        }
        else{
            if (tools > totalSettlerSpace) {
                return {
                    distance: 0,
                    message: 'Your caravan has too many resources and cannot move forward.'
                }
            }
            else {
                totalSettlerSpace -= tools
            }
        }

        //get max distance to travel
        const distanceToTravel = Math.floor(15 + Math.floor(Math.random() * 25) * travelMultiplier)
        const walkingDistance = Math.floor(distanceToTravel * .75 * travelMultiplier)

        //Can we fit all of the settlers in the wagons
        if(totalWagonSpace > 0){
            //math.floor to get number of settlers that will fit
            const settlerWeight = settlers*250

            if(totalWagonSpace > settlerWeight){
                return {
                    distance: distanceToTravel,
                    message: ''
                }
            }
            else {
                return {
                    distance: walkingDistance,
                    message: 'Your caravan has too many resources and will move slower. '
                }
            }
        }
        else{
            if(baseSettlerSpace === totalSettlerSpace) {
                return {
                    distance: walkingDistance,
                    message: 'Your caravan has too many resources and will move slower. '
                }
            }
            else {
                const reduceAmount = totalSettlerSpace / baseSettlerSpace

                return {
                    distance: Math.floor(walkingDistance * reduceAmount),
                    message: 'Your caravan has too many resources and will move much slower. '
                }
            }
        }
    }

    return (
        <section className="border gap-5 rounded p-3 d-flex flex-wrap justify-content-center m-3">
            <button type='button' className='btn btn-primary' onClick={handleTravel}>Travel</button>
            <button type='button' className='btn btn-primary' onClick={handlePreserveFood}>Preserve Food</button>
            <button type='button' className='btn btn-warning' onClick={handleKillCattle}>Kill Cattle</button>
        </section>        
    )
}

export default ActionButtons