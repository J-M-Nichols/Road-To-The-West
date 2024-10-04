import React from "react"
import { useSelector } from "react-redux"
import OverlayGrid from "./OverlayGrid"

const ResourceDisplay = () => {
    const settlers = useSelector(state=>state.settlers)
    const wagons = useSelector(state=>state.wagons)
    const food = useSelector(state=>state.food)
    const cattle = useSelector(state=>state.cattle)
    const preservedFood = useSelector(state=>state.preservedFood)
    const tools = useSelector(state=>state.tools)
    const {distanceTraveled} = useSelector(state=>state.game)
    const {currentSeason, dayCount} = useSelector(state=>state.season)

    const foodCount = food.reduce((total, item) => total + item.amount, 0)
    const preservedFoodCount = preservedFood.reduce((total, item) => total + item.amount, 0)

    let seasonColor

    switch(currentSeason){
        case 'Spring':
            seasonColor = 'success'
            break
        case 'Summer':
            seasonColor = 'danger'
            break
        case 'Fall':
            seasonColor = 'warning'
            break
        case 'Winter':
            seasonColor = 'info'
            break
        default: 
            break
    }

    const elements = [
        {
            title:`Food: ${foodCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`,
            content:'Food is used to feed settlers and earned when killing cattle. Food will expire after around 3 days.',
            setButtonColor: foodCount < 100 ? 'outline-danger' : null
        },
        {
            title:`Preserved Food: ${preservedFoodCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`,
            content:'Preserved food is used to feed settlers when there is no food available and earned by preserverving food. When preserving food if you have less than 10 settlers then you will preserve less food. Preserved food will expire after around 45 days.',
            setButtonColor: preservedFoodCount < 100 ? 'outline-danger' : null
        },
        {
            title:`Settlers: ${settlers}`,
            content:'Settlers are the lifeblood of your caravan. When you have too many resources to hold in your wagons, your settlers will have to walk or carry the resources themselves which will slow your caravan down. If all settlers perish then you lose the game. At the end of the day, each settler will eat 1-2 food. If a settler does not eat at the end of the day then they will perish.',
            setButtonColor: settlers < 3 ? 'outline-danger' : null
        },
        {
            title:`Cattle: ${cattle}`,
            content:'Cattle are used to create food and pull wagons. There must be 1 settler per cattle of they will wander off. When killing cattle if you have less than 10 settlers then you will not be able to butcher the whole cattle.',
            setButtonColor: cattle < 3 ? 'outline-danger' : null
        },
        {
            title:`Wagons: ${wagons}`,
            content:'Wagons are used to hold your resources. You will travel much slower if you do not enough wagons for your resources. There must be 1 cattle per wagon or you will have to leave it behind.',
            setButtonColor: wagons < 3 ? 'outline-danger' : null
        },
        {
            title:`Tools: ${tools}`,
            content:'Tools are used to repair wagons if they are damaged during an event. It will take about 50 tools to repair 1 wagon.',
            setButtonColor: tools < 50 ? 'outline-danger' : null
        },
        {
            title:`Current Day: ${dayCount}`,
            content:'The days that you have been out on the road.'
        },
        {
            title:`Season: ${currentSeason}`,
            content:'The current season which will determine the events that you encounter.',
            setButtonColor: seasonColor
        },
        {
            title:`Distance Traveled:\n${distanceTraveled.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} miles / 3,000 miles`,
            content:'The distance that you have travelled this journey. You reach your destination when you have travelled at least 3,000 miles west.'
        },
    ]

    return (
        <OverlayGrid 
            title='Resources'
            elements={elements}
            cols='4'
        />
    )
} 

export default ResourceDisplay