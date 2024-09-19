import React from "react"
import Game from './Game'

const Play = () => {
    return (
        <section aria-labelledby="play-heading">
            <header>
                <h1 id="play-heading">Play <strong>Road To The West</strong></h1>
            </header>
            <Game />
        </section>
    )
}

export default Play