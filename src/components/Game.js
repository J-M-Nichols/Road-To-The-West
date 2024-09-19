import React from 'react'
import {useSelector} from 'react-redux'
import ResourceDisplay from './ResourceDisplay'
import EventActions from './eventActions/EventActions'
import Notification from './Notification'
import AbandonResources from './AbandonResources'
import ActionButtons from './ActionButtons'

const Game = () => {
    const settlers = useSelector(state=>state.settlers)
    const {score, gameCompleted, distanceTraveled} = useSelector(state => state.game) 
    const {currentEvent, timeLeft} = useSelector(state=>state.event)
    const actionEvents = [4, 5]

    return (
        <div>
            {gameCompleted ?
                <div>
                    <h2>You have successfully reached the west!</h2>
                    <p>Distance : {distanceTraveled}</p>
                    <p>Score : {score}</p>
                </div>
            :
            settlers <= 0 ?
                <p>All of your settlers have perished.</p>
            :
            <div>
                <ResourceDisplay />
                <ActionButtons />
                <AbandonResources/>
                {(timeLeft > 0 && actionEvents.includes(currentEvent.id)) && 
                    <EventActions
                        eventID={currentEvent.id}
                    />
                }
                <Notification />
            </div>}
            <div className='d-flex justify-content-center m-3'>
                <button 
                    type='button'
                    className='btn btn-danger'
                    onClick={()=>window.location.reload()}
                >Reset Game</button>
            </div>
        </div>
    )
}

export default Game