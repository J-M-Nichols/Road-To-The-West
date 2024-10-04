import { createAsyncThunk } from "@reduxjs/toolkit";
import events from "./events";
import { decrementTime, startEvent } from "./eventSlice";
import { addContent } from "../notificationSlice/notificationSlice";
import { removeSettlers } from "../resourceSlices/settlersSlice/settlersSlice";
import { killCattle } from "../resourceSlices/cattleSlice/cattleSlice";
import { removeTools } from "../resourceSlices/toolsSlice/toolsSlice";
import { removeWagons } from "../resourceSlices/wagonsSlice/wagonsSlice";

const getTimeLeft = (eventID)=>{
    switch (eventID){
        case 0: return 1
        case 1: return 2+Math.floor(Math.random()*2)
        case 2: return 2+Math.floor(Math.random()*2)
        case 3: return 1
        case 4: return 1
        case 5: return 1
        case 6: return 2+Math.floor(Math.random()*2)
        default: return 0
    }
}

/**
 * Attempts to see if wagons can be saved by tools
 * Then removes tools and wagons if their respective removal count is greater than 0.
 * @param {Int} wagonCount 
 * @param {Int} toolCount
 */
const calculateRemoveWagons = (wagonCount, toolCount) => {
    //(25 + Math.floor(Math.random() * 50))
    let toolsToRemove = 0
    let wagonsToRemove = wagonCount

    for(let i = 0; i < wagonCount; i++){
        const toolCost = 25 + Math.floor(Math.random() * 50)
        if((toolsToRemove + toolCost) > toolCount) break

        toolsToRemove += toolCost
        wagonsToRemove--
    }

    return {
        toolsLost: toolsToRemove,
        wagonsLost: wagonsToRemove,
        wagonsSaved: wagonCount - wagonsToRemove
    }
}

const getPercentage = (min, range) => {
    return (min + Math.floor(Math.random() * range))/100
}

export const checkForNewEvent = createAsyncThunk(
    'game/checkForNewEvent',
    async (isTraveling, {getState, dispatch})=>{
        const state = getState()
        const {currentSeason} = state.season
        const timeLeft = state.event.timeLeft -1
        const {settlers, wagons, cattle, tools} = state

        dispatch(decrementTime())
        
        if(timeLeft <= 0 && isTraveling){
            //gather possible event options
            const possibleEvents = events.filter(event => {
                const chance = Math.random() 
                return chance < event.seasonChance[currentSeason]
            })

            //has event options
            if(possibleEvents.length > 0){
                //new event selected from the possible events
                const newEvent = possibleEvents[Math.floor(Math.random() * possibleEvents.length)]

                //set new event
                dispatch(startEvent({
                    currentEvent: newEvent,
                    timeLeft: getTimeLeft(newEvent.id)
                }))

                let toolsLeft = tools
                let baseMessage = ''
                const notificationMessage = []

                let finalMessage

                //set actions for the new event
                switch(newEvent.id){
                    //river crossing
                    case 0: // chance of 5% per resource to lose 25%-30% of the total
                        baseMessage = 'During a river crossing, you '

                        // settlers
                        if(Math.random() < 0.05) {
                            const settlerRemoveCount = Math.ceil(settlers * (getPercentage(25, 5)))
                            
                            notificationMessage.push({
                                type: 'settlers',
                                amount: settlerRemoveCount
                            })

                            dispatch(removeSettlers(settlerRemoveCount))
                        }
        
                        // cattle
                        if(Math.random() < 0.1) {
                            const cattleRemoveCount = Math.ceil(cattle * (getPercentage(25, 5)))

                            notificationMessage.push({
                                type: 'cattle',
                                amount: cattleRemoveCount
                            })

                            dispatch(killCattle(cattleRemoveCount))
                        }
        
                        //tools
                        if(Math.random() < 0.05) {
                            const toolsToRemove = Math.ceil(tools * (getPercentage(25, 5))) 
                            toolsLeft -= toolsToRemove

                            notificationMessage.push({
                                type: 'tools',
                                amount: toolsToRemove
                            })

                            dispatch(removeTools(toolsToRemove))
                        }

                        //wagons
                        if(Math.random() < 0.15) {
                            const {toolsLost, wagonsLost, wagonsSaved} = calculateRemoveWagons(Math.ceil(wagons * (getPercentage(25, 5))), toolsLeft)

                            if(toolsLost>0){
                                dispatch(removeTools(toolsLost))
                                notificationMessage.push({
                                    type: `tools while repairing ${wagonsSaved} wagons`,
                                    amount: toolsLost
                                })
                            }
                            if(wagonsLost>0){
                                dispatch(removeWagons(wagonsLost))
                                notificationMessage.push({
                                    type: 'wagons',
                                    amount: wagonsLost
                                })
                            }
                        }
                        
                        if(notificationMessage.length > 0){
                            finalMessage = baseMessage + 'lost ' + notificationMessage.reduce((message, obj)=>{
                                return `${message}${obj.amount} ${obj.type}, `
                            }, '').slice(0,-2)+'.'
                            dispatch(addContent({
                                content: finalMessage,
                                classNames: 'text-danger'
                            }))
                        }
                        else{
                            finalMessage = baseMessage + 'did not lose anything.'
                            dispatch(addContent({
                                content: finalMessage,
                                classNames: 'text-warning'
                            }))
                        }
                        break
                    //illness
                    case 1: // chance of 5% per settler to lose the settler
                        let settlerCount = settlers
                        for(let i = 0; i < settlers; i++){
                            if(Math.random() < 0.05) settlerCount--
                        }

                        if(settlerCount < settlers) {
                            const lostSettlersCount = settlers - settlerCount
                            dispatch(addContent({
                                content: `You lost ${lostSettlersCount} settlers to an illness.`,
                                classNames: 'text-danger'
                            }))
                            dispatch(removeSettlers(lostSettlersCount))
                        }
                        else {
                            dispatch(addContent({
                                content: 'Your settlers are ill but they all made it through the night.',
                                classNames: 'text-warning'
                            }))
                        }
                        break
                    //heat wave
                    case 2:
                        dispatch(addContent({
                            content: 'There is a heat wave, all food will expire faster.',
                            classNames: 'text-warning'
                        }))
                        break
                    //native americans
                    case 3: // chance of 50% per resource to lose 5%-10% of the total
                        baseMessage = 'While being attacked by a group of hostile native Americans, you '

                        // settlers
                        if(Math.random() < 0.6) {
                            const lostSettlers = Math.ceil(settlers * (getPercentage(5, 5)))
                            
                            if(lostSettlers > 0) notificationMessage.push({
                                type: 'settlers',
                                amount: lostSettlers
                            })

                            dispatch(removeSettlers(lostSettlers))
                        }
        
                        // cattle
                        if(Math.random() < 0.65) {
                            const lostCattle = Math.ceil(cattle * (getPercentage(5, 5)))

                            if(lostCattle > 0) notificationMessage.push({
                                type: 'cattle',
                                amount: lostCattle
                            })

                            dispatch(killCattle(lostCattle))
                        }
        
                        //tools
                        if(Math.random() < 0.35) {
                            const toolsToRemove = Math.ceil(tools * (getPercentage(5, 5)))
                            toolsLeft -= toolsToRemove

                            if(toolsToRemove > 0) notificationMessage.push({
                                type: 'tools',
                                amount: toolsToRemove
                            })

                            dispatch(removeTools(toolsToRemove))
                        }
        
                        //wagons
                        if(Math.random() < 0.4) {
                            const {toolsLost, wagonsLost, wagonsSaved} = calculateRemoveWagons(Math.ceil(wagons * (getPercentage(5, 5))), toolsLeft)
                            
                            if(toolsLost>0){
                                dispatch(removeTools(toolsLost))
                                notificationMessage.push({
                                    type: `tools while repairing ${wagonsSaved} wagons`,
                                    amount: toolsLost
                                })
                            }
                            if(wagonsLost>0){
                                dispatch(removeWagons(wagonsLost))
                                notificationMessage.push({
                                    type: 'wagons',
                                    amount: wagonsLost
                                })
                            }
                        }
                        
                        if(notificationMessage.length > 0){
                            finalMessage = baseMessage + 'lost ' + notificationMessage.reduce((message, obj)=>{
                                return `${message}${obj.amount} ${obj.type}, `
                            }, '').slice(0,-2)+'.'
                            dispatch(addContent({
                                content: finalMessage,
                                classNames: 'text-danger'
                            }))
                        }
                        else{
                            finalMessage = baseMessage + 'did not lose anything.'
                            dispatch(addContent({
                                content: finalMessage,
                                classNames: 'text-warning'
                            }))
                        }
                        break
                    //settlers
                    case 4:
                        dispatch(addContent({
                            content:'You have encountered a group of friendly settlers. They may wish to trade with you.',
                            classNames: 'text-success'
                        }))
                        break
                    //cattle
                    case 5:
                        dispatch(addContent({
                            content: 'You have encountered some cattle.',
                            classNames: 'text-success'
                        }))
                        break
                    //storm
                    case 6:
                        dispatch(addContent({
                            content: 'There is a storm. You will move a bit slower in the mud.',
                            classNames: 'text-warning'
                        }))
                        break
                    default: break
                }
            }
            //no current event
            else {
                dispatch(startEvent({
                    currentEvent: {name:''},
                    timeLeft:0
                }))
            }
        }
    }
)