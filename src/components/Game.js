import React from 'react'
import {useSelector} from 'react-redux'
import ResourceDisplay from './ResourceDisplay'
import EventActions from './eventActions/EventActions'
import Notification from './Notification'
import AbandonResources from './AbandonResources'
import ActionButtons from './ActionButtons'
import { GitHubStorageHandlers } from 'github-localstorage-handler'
import trackedPaths from '../handlers/trackedPaths'

const Game = () => {
    const settlers = useSelector(state=>state.settlers)
    const {score, gameCompleted, distanceTraveled} = useSelector(state => state.game) 
    const {currentEvent, timeLeft} = useSelector(state=>state.event)
    const actionEvents = [4, 5]

    const handlers = new GitHubStorageHandlers(...Object.keys(trackedPaths))

    const resetGame = _ => {
        handlers.clearAllPaths()
        window.location.reload()
    }

    return (
        <div>
            {gameCompleted ?
                <div>
                    <h2>You have successfully reached the west!</h2>
                    <article
                        className='d-flex gap-3 justify-content-center mt-3'
                    >
                        <p
                            className='border rounded p-2'
                        >Distance : {distanceTraveled}</p>
                        <p
                            className='border rounded p-2'
                        >Score : {score}</p>
                    </article>
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
            </div>}
            <Notification />
            <div className='d-flex justify-content-center m-3'>
                <button 
                    type='button'
                    className='btn btn-danger'
                    onClick={resetGame}
                >Reset Game</button>
            </div>
        </div>
    )
}

export default Game