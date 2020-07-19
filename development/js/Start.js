import React, { useState, useEffect } from "react";
import Game from "./Game";

const Start = () => {
    const [menu, setMenu] = useState(-1);
    const handleStart = () => {
        setMenu(0);
    }

    if (menu === -1) {
        return (
            <>
                <h1>Gotowy do gry?</h1>
                <button onClick={handleStart}>Graj</button>
            </>
        )
    } else if (menu === 0) {
        return (
            <>
                <Game />
            </>
        )
    }
}

export default Start;
