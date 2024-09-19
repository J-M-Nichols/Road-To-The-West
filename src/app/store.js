import { configureStore, combineReducers } from "@reduxjs/toolkit"
import foodReducer from '../features/resourceSlices/foodSlice/foodSlice'
import preservedFoodReducer from '../features/resourceSlices/preservedFoodSlice/preservedFoodSlice'
import cattleReducer, {gainCattle} from '../features/resourceSlices/cattleSlice/cattleSlice'
import wagonsReducer from '../features/resourceSlices/wagonsSlice/wagonsSlice'
import settlersReducer from '../features/resourceSlices/settlersSlice/settlersSlice'
import toolsReducer from '../features/resourceSlices/toolsSlice/toolsSlice'
import seasonsReducer from "../features/seasonsSlice/seasonsSlice"
import eventReducer from "../features/eventSlice/eventSlice"
import gameReducer from '../features/gameSlice/gameSlice'
import notificationReducer from "../features/notificationSlice/notificationSlice"

const rootReducer = combineReducers({
    food: foodReducer,
    preservedFood: preservedFoodReducer,
    cattle: cattleReducer,
    wagons: wagonsReducer,
    settlers: settlersReducer,
    tools: toolsReducer,
    season: seasonsReducer,
    event: eventReducer,
    game: gameReducer,
    notification: notificationReducer,
})

export const store = configureStore({
    reducer: rootReducer,
})

store.dispatch(gainCattle(store.getState().wagons))