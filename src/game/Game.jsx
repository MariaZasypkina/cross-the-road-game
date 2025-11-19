// src/game/Game.jsx
import React, { useRef } from "react";
import GameCanvas from "./GameCanvas.jsx";
import { useGameEngine } from "./useGameEngine.js";
import { CANVAS_WIDTH, CANVAS_HEIGHT } from "./constants.js";

function Game() {
  const canvasRef = useRef(null);
  const { level, lives, status, restartGame, goToNextLevel, maxLevel } =
    useGameEngine(canvasRef);

  const isWon = status === "won";
  const isLost = status === "lost";
  const isFinished = status === "finished";

  return (
    <div
      style={{
        maxWidth: "800px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        alignItems: "center",
      }}
    >
      <h1 style={{ margin: 0, fontSize: "38px" }}>Want a discount? </h1>
      <p style={{ margin: 0, opacity: 0.9, textAlign: "center" }}>
        Get through all three levels, avoid the crocos, grab the coin and reach the
       finish to win a discount
      </p>

      <GameCanvas
        canvasRef={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
      />

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "12px",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "4px",
        }}
      >
        <span>
          Level: {level} / {maxLevel}
        </span>
        <span>Lives: {lives}</span>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "12px",
          justifyContent: "center",
          marginTop: "4px",
        }}
      >
        <button
          onClick={restartGame}
          style={{
            padding: "8px 16px",
            borderRadius: "999px",
            border: "none",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Restart
        </button>

        {isWon && !isFinished && (
          <button
            onClick={goToNextLevel}
            style={{
              padding: "8px 16px",
              borderRadius: "999px",
              border: "none",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Next level
          </button>
        )}
      </div>

      <div
        style={{
          marginTop: "8px",
          fontSize: "14px",
          textAlign: "center",
          maxWidth: "520px",
          opacity: 0.9,
        }}
      >
        <p style={{ marginBottom: "4px" }}>
          <strong>Controls:</strong> Use the arrow keys to move up, down, left
          and right.
        </p>
        <p style={{ marginTop: 0 }}>
          If you touch a bug, you lose a life and start from the bottom again.
          Pick up the key, then reach the princess at the top to unlock the door
          to the next level.
        </p>

        {isLost && (
          <p style={{ color: "red", fontWeight: "bold" }}>
            Game over. Press Restart to try again.
          </p>
        )}

        {isFinished && (
          <p style={{ marginTop: "8px", fontWeight: 600 }}>
            You completed all levels and won the princess&apos;s heart! ❤️
          </p>
        )}
      </div>
    </div>
  );
}

export default Game;
