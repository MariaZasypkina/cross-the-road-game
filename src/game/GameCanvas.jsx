// src/game/GameCanvas.jsx
import React from "react";

function GameCanvas({ canvasRef, width, height }) {
  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{
        borderRadius: "16px",
        boxShadow: "0 12px 30px rgba(0, 0, 0, 0.4)",
        backgroundColor: "#053905ff",
        maxWidth: "100%",
      }}
    />
  );
}

export default GameCanvas;
