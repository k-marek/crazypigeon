import React, { useState, useEffect } from "react";
import Game from "./Game"

const EndGame = ({ points }) => {
    const [isGameOn, setIsGameOn] = useState(false);
    const handlePlayAgain = () => {
        setIsGameOn(true);
    }

    if (!isGameOn) {
        return (
            <>
                <h1>Game over :(</h1>
                <h2>Points: {points}</h2>
                <button onClick={handlePlayAgain}>Play again</button>
            </>
        )
    } else {
        return <Game />

    }
}

export default EndGame;