import React, { useState, useEffect } from "react";
import useInterval from "./lib/useInterval";

const Pigeon = (props) => {
  const [positionX, setPositionX] = useState();
  const [positionY, setPositionY] = useState();
  //const [size, setSize] = useState(Math.floor(Math.random() * (4 - 1)) + 1);
  const [pigeonProps, setPigeonProps] = useState(props);

  const [speedXY, setSpeedXY] = useState(); // x, y
  const [speed, setSpeed] = useState();
  const [nextChange, setNextChange] = useState();

  // move pigeon
  useInterval(() => {
    if (!pigeonProps.data.pause) {
      let needChangeDir = false;

      let newXY = {
        x: 0,
        y: 0,
      };

      if (positionX > window.innerWidth - pigeonProps.data.size * 10) {
        newXY.x = -2;
        needChangeDir = true;
      } else if (positionX < 10) {
        newXY.x = 2;
        needChangeDir = true;
      } else if (positionY > window.innerHeight - pigeonProps.data.size * 10) {
        newXY.y = -2;
        needChangeDir = true;
      } else if (positionY < 10) {
        newXY.y = 2;
        needChangeDir = true;
      }

      if (needChangeDir) {
        needChangeDir = false;
        setSpeedXY((prev) => [newXY.x, newXY.y]);
      }

      setPositionX((prev) => prev + speedXY[0]);
      setPositionY((prev) => prev + speedXY[1]);

      if (nextChange <= 0) {
        setNextChange((Math.floor(Math.random() * 5) + 1) * 10);
        let newSpeed = speedXY;
        let random = Math.floor(Math.random() * 201) - 100;

        newSpeed[Math.floor(Math.random() > 0.5 ? 0 : 1)] = Math.floor(
          random / 15
        );
        console.log(newSpeed);

        setSpeedXY((prev) => newSpeed);
        setSpeed((Math.floor(Math.random() * 10) + 5) * 3);
      } else {
        setNextChange((prev) => prev - 1);
      }
    }
  }, speed);

  // interwał ruch
  useEffect(() => {
    setPigeonProps(props);
    setSpeed(10);
    setSpeedXY([2, 2]);
    setNextChange(50);

    setPositionX(Math.floor(Math.random() * 200) + 1);
    setPositionY(Math.floor(Math.random() * 200) + 1);
  }, [pigeonProps]);

  return (
    <div
      className="pigeon"
      style={{
        position: "absolute",
        left: positionX,
        top: positionY,

        width: pigeonProps.data.size * 10 + "px",
        height: pigeonProps.data.size * 10 + "px",
      }}
      onClick={(event) =>
        pigeonProps.shot(event, pigeonProps.data.id, pigeonProps.data.point)
      }
    ></div>
  );
};

export default Pigeon;
