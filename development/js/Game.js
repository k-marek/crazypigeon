import React, { useState, useEffect, useRef } from "react";
import Start from "./Start";
import EndGame from "./EndGame";
import Pigeon from "./Pigeon";
import useInterval from "./lib/useInterval";

const Game = () => {
  const [pause, setPauseGame] = useState();
  const [timer, settimer] = useState(100);
  const [isGameOn, setIsGameOn] = useState(true);
  const [pigeonDelay, setPigeonDelay] = useState();

  const [pigeons, setPigeons] = useState([]);
  const [pigeonCounter, setPigeonsCounter] = useState();

  const [points, setPoints] = useState(0);

  const [amu, _setAmu] = useState(7);
  const amuRef = useRef(amu); // trik na dostep w eventach - korzystamy z useRef

  const handleShot = (event, id, point) => {
    event.stopPropagation();
    setAmu(amuRef.current <= 0 ? 0 : amuRef.current - 1);
    console.log("handleShot", pause);

    if (id >= 0 && amuRef.current > 0 && point > 0 && !pause) {
      setPoints((prev) => prev + point);

      setPigeons((prev) => {
        let r = prev;
        r = r.filter((element) => element.id != id);
        return r;
      });
    }
  };

  const handleReload = (e) => {
    e.preventDefault();
    setAmu(7);
    console.log("Przeładowuję");
  };

  const handleGamePause = (p) => {
    setPauseGame(p);
    setPigeons((prev) => {
      prev.forEach((element) => (element.pause = p));
      return prev;
    });
  };

  const handleGameQuit = () => {
    setIsGameOn(false);
  };

  //// trik na dostep w eventach - korzystamy z useRef
  const setAmu = (data) => {
    amuRef.current = data;
    _setAmu(data);
  };

  // add pigeon
  const addPigeon = (pause) => {
    let min_size = 5;
    let max_size = 30;
    let size = Math.floor(Math.random() * max_size) + min_size;
    const pigeon = {
      id: pigeonCounter,
      pause: pause,
      size: size,
      point: max_size + 1 - size,
    };
    setPigeons((prev) => [...prev, pigeon]);
  };

  // interval timer for game countdown
  useInterval(() => {
    if (!pause) {
      settimer((prev) => prev - 1);
    }
  }, 1000);

  //interval for add pigeon with random pigeonDelay (400-800ms)
  useInterval(() => {
    if (!pause) {
      addPigeon(pause);
      setPigeonDelay(Math.floor(Math.random() * 6 + 4) * 250); // rand 4-8 * 100ms
      setPigeonsCounter((prev) => prev + 1);
    }
  }, pigeonDelay);

  useEffect(() => {
    setPigeonsCounter(0);
  }, []);

  if (timer < 0) {
    return <EndGame points={points} />;
  } else if (!isGameOn) {
    return <Start />;
  } else {
    return (
      <div className="game-container">
        <div className="game" onContextMenu={handleReload}>
          <div className="game-nav-container">
            <div className="game-nav">
              <p>Time left: {timer}</p>
              <p>Amu left: {amu}</p>
              <p>Points: {points}</p>
              <button
                className="game-btn"
                onClick={() => handleGamePause(pause ? false : true)}
              >
                {pause ? "Resume" : "Pauza"}
              </button>
              <button className="game-btn" onClick={handleGameQuit}>
                Quit
              </button>
            </div>
          </div>
          <div
            className="platform"
            style={{
              position: "relative",

              width: "100vw",
              height: "80vh",
            }}
            onClick={(event) => handleShot(event, null)}
          >
            {pigeons.map((element) => {
              return (
                <Pigeon
                  key={element.id}
                  data={element}
                  shot={(event) => handleShot(event, element.id, element.point)}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
};

export default Game;
