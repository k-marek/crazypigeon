import React, { useState, useEffect } from "react";
import Game from "./Game";

const Start = () => {
  const [menu, setMenu] = useState(-1);
  const handleStart = () => {
    setMenu(0);
  };

  if (menu === -1) {
    return (
      <>
        <div className="start-container">
          <div className="nav-container">
            <h1 className="start-title">Creazy pigeon!</h1>
            <button className="start-btn" onClick={handleStart}>
              Play
            </button>
          </div>
        </div>
      </>
    );
  } else if (menu === 0) {
    return (
      <>
        <Game />
      </>
    );
  }
};

export default Start;
