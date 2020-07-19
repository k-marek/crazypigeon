import React, { useState, useEffect } from "react";

const Game = () => {
    const [time, setTime] = useState(10);
    const [intervalId, setIntervalId] = useState(-1);
    const [points, setPoints] = useState(0);
    const [isGameOn, setIsGameOn] = useState(true);

    useEffect(() => {
        runInterval()
    }, []);

    const handlePauza = () => {
        console.log(time);
        if (intervalId === -1) {
            runInterval();
        } else {
            console.log("pauza");
            clearInterval(intervalId);
            setIntervalId(-1);
        }

    }

    const runInterval = () => {
        const interval = setInterval(() => {
            setTime(prev => prev - 1);
            // console.log(time);
            if (time < 1) {
                console.log("Czas minał");
                // clearInterval(intervalId)
            }
        }, 1000);
        setIntervalId(interval);
    }



    if (time == 0 && points < 100) {
        return (
            <p>Dupa</p>
        )
    } else {
        return (
            <>
                <h1>{time}</h1>
                <h1>Points:</h1>
                <h1>Amunition</h1>
                <button onClick={handlePauza}>{intervalId == -1 ? "Resume" : "Pauza"} </button>
                <button>Wyjdź z gry</button>
            </>

        )
    }


}

export default Game;