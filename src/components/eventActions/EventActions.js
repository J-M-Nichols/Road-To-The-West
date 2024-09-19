import React from "react"
import SettlerAction from "./SettlerAction"
import CattleAction from './CattleAction'

const EventActions = ({eventID}) => {
    return (
        <div className="d-flex flex-wrap justify-content-center m-3 p-3 border rounded">
            {eventID===4 && <SettlerAction/>}
            {eventID===5 && <CattleAction/>}
        </div>
    )
}

export default EventActions