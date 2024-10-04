import React from "react"
import { useDispatch } from "react-redux"
import { gainCattle } from "../../features/resourceSlices/cattleSlice/cattleSlice"
import { decrementTime } from "../../features/eventSlice/eventSlice"
import { addContent } from "../../features/notificationSlice/notificationSlice"

/**
 * id: 5
 * can accept from 1 to 2 cattle 
 */
const CattleAction = () => {
    const dispatch = useDispatch()
    const cattleCount = 1 + Math.round(Math.random())

    const acceptCattle = () => {
        dispatch(gainCattle(cattleCount))
        dispatch(addContent({
            content: `You gained ${cattleCount} cattle.`,
            classNames: 'text-info'
        }))

        dispatch(decrementTime())
    }

    return (
        <button 
            type="button"
            className="btn btn-success"
            onClick={acceptCattle} 
        >Capture {cattleCount} cattle</button>
    )
}

export default CattleAction