import React, { useState, useEffect, createElement } from "react";
import Start from "./Start"
import EndGame from "./EndGame";

const Game = () => {
    const [time, setTime] = useState(10);
    const [intervalTime, setIntervalTime] = useState(-1);
    const [intervalDiv, setIntervalDiv] = useState(-1);
    const [points, setPoints] = useState(0);
    const [amu, setAmu] = useState(7);
    const [newPigeon, setNewPigeon] = useState([]);
    const [isGameOn, setIsGameOn] = useState(true);
    const [isPeagonShot, setIsPeagonShot] = useState(false);
    const [isOutOfAmu, setIsOutOfAmu] = useState(false);


    useEffect(() => {
        runIntervalTime();
    }, []);

    useEffect(() => {
        runIntervalDiv()
    }, []);

    // odliczanie czasu gry, zapis czasu do stanu (pauza)
    const runIntervalTime = () => {
        const interval = setInterval(() => {
            setTime(prev => prev - 1);
        }, 1000);
        setIntervalTime(interval);
    }

    // nowy ptak 
    const Pigeon = () => {
        const [backgroundColor, SetBackgroundColor] = useState("grey");
        const [positionX, setPositionX] = useState(Math.floor(Math.random() * (500 - 1)) + 1);
        const [positionY, setPositionY] = useState((Math.random() * (500 - 1)) + 1);
        const [size, SetSize] = useState(Math.floor(Math.random() * (4 - 1)) + 1);

        // zestrzelenie ptaka
        const handleShootPigeon = () => {
            setPoints(prev => prev + 10);
            setAmu(prev => prev - 1);
            setIsPeagonShot(true);
            amu < 2 ? setIsOutOfAmu(true) : setIsOutOfAmu(false);
            setNewPigeon(newPigeon.splice(newPigeon.length - 1, 1));
        }

        return (
            <div style={{
                position: "absolute", left: positionX, top: positionY,
                backgroundColor: backgroundColor,
                width: size * 10 + "px",
                height: size * 10 + "px",

            }}
                onClick={isOutOfAmu ? handleBlocked : handleShootPigeon}>Nowy element</div>
        )

    }

    const runIntervalDiv = () => {
        const timeOut = setInterval(() => {
            setNewPigeon(prev => {
                return [...prev, <Pigeon />]
            });
        }, 1500);
        setIntervalDiv(timeOut);
    }

    // strzelanie
    const handleShoot = () => {
        // setPoints(prev => prev + 10);
        setAmu(prev => prev - 1);
        // setIsPeagonShot(true);
        amu < 2 ? setIsOutOfAmu(true) : setIsOutOfAmu(false);
    }

    // przeładowanie
    const handleReload = (e) => {
        e.preventDefault();
        setAmu(7);
        SetIsOutOfAmu(false);
    }

    const handleBlocked = (e) => {
        e.preventDefault()
    }

    // przycisk pauzy, zatrzymanie interwałów
    const handlePauza = () => {
        if (intervalTime === -1 && intervalDiv == -1) {
            runIntervalTime();
            runIntervalDiv();
        } else {
            clearInterval(intervalTime);
            setIntervalTime(-1);
            clearInterval(intervalDiv);
            setIntervalDiv(-1)
        }
    }

    // wyjscie z gry
    const handleQuitGame = () => {
        setIsGameOn(false)
    }

    if (time == 0 && points < 100) {
        clearInterval(intervalTime)
        return (
            <EndGame points={points} />
        )
    } else if (!isGameOn) {
        return <Start />

    } else {
        return (
            <>

                <h1>{time}</h1>
                <h1>Points: {points}</h1>
                <h1>Amunition: {amu}</h1>
                <button onClick={handlePauza}>{intervalTime == -1 ? "Resume" : "Pauza"} </button>
                <button onClick={handleQuitGame}>Wyjdź z gry</button>

                <div style={{
                    border: "1px solid green",
                    position: "relative",
                    height: window.innerHeight,
                    width: window.innerWidth,

                }}
                    onClick={isOutOfAmu ? handleBlocked : handleShoot} onContextMenu={handleReload}
                > {newPigeon}</div>

            </>

        )
    }


}

export default Game;
