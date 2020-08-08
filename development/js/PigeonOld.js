import React, { useState, useEffect } from "react";

const Pigeon = () => {
    const [backgroundColor, setBackgroundColor] = useState("grey");
    const [positionX, setPositionX] = useState(Math.floor(Math.random() * (100 - 1)) + 1);
    const [positionY, setPositionY] = useState((Math.random() * (500 - 1)) + 1);
    const [size, setSize] = useState(Math.floor(Math.random() * (4 - 1)) + 1);

    useEffect(() => {
        const intervalMove = setInterval(() => {
            const moveLeft = -10;
            const moveRight = 10;
            setPositionX(prev => prev + 2);
            setPositionY(prev => prev + 1);
        }, 200);
    }, [])

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
            onClick={isOutOfAmu ? handleBlocked : handleShootPigeon}></div>
    )

}
export default Pigeon;