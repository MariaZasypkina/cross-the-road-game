// src/App.jsx
import React from "react";
import Game from "./game/Game.jsx";

function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        background: "linear-gradient(135deg, #1d3557, #457b9d)",
        color: "#f1faee",
        padding: "20px",
      }}
    >
      <Game />
    </div>
  );
}

export default App;
