import React, { useState } from "react";
import "./App.css";

function App() {
  const [targetColor, setTargetColor] = useState(generateRandomColor());
  const [playerColor, setPlayerColor] = useState({ r: 128, g: 128, b: 128 });
  const [score, setScore] = useState(null);

  function generateRandomColor() {
    return {
      r: Math.floor(Math.random() * 256),
      g: Math.floor(Math.random() * 256),
      b: Math.floor(Math.random() * 256),
    };
  }

  function handleSliderChange(event, color) {
    setPlayerColor((prev) => ({
      ...prev,
      [color]: parseInt(event.target.value),
    }));
  }

  function calculateScore() {
    const diffR = Math.abs(targetColor.r - playerColor.r);
    const diffG = Math.abs(targetColor.g - playerColor.g);
    const diffB = Math.abs(targetColor.b - playerColor.b);
    const totalDifference = diffR + diffG + diffB;
    const maxDifference = 255 * 3;
    const newScore = Math.round(((maxDifference - totalDifference) / maxDifference) * 100);
    setScore(newScore);
  }

  function resetGame() {
    setTargetColor(generateRandomColor());
    setPlayerColor({ r: 128, g: 128, b: 128 });
    setScore(null);
  }

  return (
    <div className="app">
      <h1>Color Match Game</h1>

      <div className="colors">
        <div className="color-box" style={{ backgroundColor: `rgb(${targetColor.r}, ${targetColor.g}, ${targetColor.b})` }}>
          <p>Target Color</p>
        </div>
        <div className="color-box" style={{ backgroundColor: `rgb(${playerColor.r}, ${playerColor.g}, ${playerColor.b})` }}>
          <p>Your Color</p>
        </div>
      </div>

      <div className="sliders">
        {["r", "g", "b"].map((color) => (
          <div key={color} className="slider">
            <label>{color.toUpperCase()}</label>
            <input
              type="range"
              min="0"
              max="255"
              value={playerColor[color]}
              onChange={(e) => handleSliderChange(e, color)}
            />
          </div>
        ))}
      </div>

      <button className="btn match-btn" onClick={calculateScore}>
        Match
      </button>
      <button className="btn reset-btn" onClick={resetGame}>
        Reset
      </button>

      {score !== null && <p className="score">Your Score: {score}%</p>}
    </div>
  );
}

export default App;
