// src/game/Game.jsx
import React, { useRef, useState, useEffect } from "react";
import GameCanvas from "./GameCanvas.jsx";
import { useGameEngine } from "./useGameEngine.js";
import { CANVAS_WIDTH, CANVAS_HEIGHT } from "./constants.js";
import vendingImg from "../assets/game/vending-machine.png";


const MAX_COINS = 3; // player gets 3 coins (one per level)

function Game() {
  const canvasRef = useRef(null);
  const { level, lives, status, restartGame, goToNextLevel, maxLevel } =
    useGameEngine(canvasRef);

  const isWon = status === "won";
  const isLost = status === "lost";
  const isFinished = status === "finished";

  // --- Discount / vending machine state ---

  // Controls modal visibility
  const [isVendingOpen, setIsVendingOpen] = useState(false);

  // All discounts the user has already won (e.g. [2, 0, 4])
  const [discounts, setDiscounts] = useState([]);

  // To make sure 4% and 5% appear only once each
  const [rareUsed, setRareUsed] = useState({
    4: false,
    5: false,
  });

  // Open vending machine automatically when all levels are finished
  useEffect(() => {
    if (status === "finished") {
      setIsVendingOpen(true);
      setDiscounts([]);
      setRareUsed({ 4: false, 5: false });
    }
  }, [status]);

  const coinsUsed = discounts.length;
  const coinsLeft = Math.max(0, MAX_COINS - coinsUsed);
  useEffect(() => {
  function handleEnter(e) {
    if (e.key === "Enter") {
      if (status === "won" && !isFinished && !isVendingOpen) {
        goToNextLevel();
      }
    }
  }

  window.addEventListener("keydown", handleEnter);

  return () => window.removeEventListener("keydown", handleEnter);
}, [status, isFinished, isVendingOpen, goToNextLevel]);

  const totalDiscount = discounts.reduce((sum, d) => sum + d, 0);

  function generateDiscountWithRules(prevRare) {
  // total 20 discount "cards"
  const deck = [
    4,        // one 4%
    5,        // one 5%
    ...Array(7).fill(1), // seven 1%
    ...Array(6).fill(2), // six 2%
    ...Array(5).fill(3), // five 3%
  ];

  let discount;

  while (true) {
    const randomIndex = Math.floor(Math.random() * deck.length);
    const d = deck[randomIndex];

    // checking rare discounts
    if ((d === 4 || d === 5) && prevRare[d]) {
      continue; // 4 and 5% are never repeat
    }

    discount = d;
    break;
  }

  // renew rareUsed
  const updatedRare = { ...prevRare };
  if (discount === 4 || discount === 5) {
    updatedRare[discount] = true;
  }

  return { discount, updatedRare };
}


  // Called when user clicks "Win discount"
  function handleWinDiscount() {
    if (coinsUsed >= MAX_COINS) return; // no more coins

    setRareUsed((prevRare) => {
      const { discount, updatedRare } = generateDiscountWithRules(prevRare);

      // Add this discount to the list
      setDiscounts((prev) => [...prev, discount]);
console.log("CLICK");
      return updatedRare;
    });
  }

  // Restart game + reset vending state
  function handleRestart() {
    restartGame();
    setIsVendingOpen(false);
    setDiscounts([]);
    setRareUsed({ 4: false, 5: false });
  }
function handleCloseVending() {
  setIsVendingOpen(false);
}

  // When user clicks final CTA button
  function handleOrderWithDiscount() {
    const subject = encodeURIComponent("I won a discount!");
    const body = encodeURIComponent(
      `Hello! I won a discount of ${totalDiscount}% in your game and would like to make an order now.`
    );

    // TODO: replace email with your real address later
    const email = "creative.code.palette@gmail.com";

    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  }

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
      <h1 style={{ margin: 0, fontSize: "38px" }}>Want a discount?</h1>
      <p style={{ margin: 0, opacity: 0.9, textAlign: "center" }}>
        Get through all three levels, avoid the crocos, grab the coin and reach
        the finish to win a discount.
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
          onClick={handleRestart}
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
          If you touch a croco, you lose a life and start from the bottom again.
          Pick up the coin, then reach the finish at the top to unlock the door
          to the next level.
        </p>

        {isLost && (
          <p style={{ color: "red", fontWeight: "bold" }}>
            Game over. Press Restart to try again.
          </p>
        )}

        {isFinished && (
          <p style={{ marginTop: "8px", fontWeight: 600 }}>
            You completed all levels and earned 3 bonus coins! Use them in the
            vending machine to win your discount.
          </p>
        )}
      </div>

          {/* --- Vending machine modal --- */}
     {isVendingOpen && (
  <div
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0, 0, 0, 0.7)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 999,
    }}
  >
    <div
      style={{
        position: "relative",              // ← обязательно!
        background: "linear-gradient(145deg, #24143a, #3b2560)",
        borderRadius: "24px",
        padding: "24px",
        maxWidth: "640px",
        width: "90%",
        boxShadow: "0 20px 50px rgba(0, 0, 0, 0.6)",
        color: "#fefefe",
      }}
    >

      {/* КНОПКА-КРЕСТИК */}
      <button
        onClick={handleCloseVending}
        style={{
          position: "absolute",
          top: "12px",
          right: "12px",
          background: "rgba(255, 255, 255, 0.15)",
          border: "none",
          borderRadius: "50%",
          width: "32px",
          height: "32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: "#ffffff",
          fontSize: "18px",
          fontWeight: "bold",
          backdropFilter: "blur(4px)",
        }}
      >
        ×
      </button>

            <h2 style={{ marginTop: 0, marginBottom: "8px", fontSize: "26px" }}>
              Bonus vending machine
            </h2>
            <p style={{ marginTop: 0, marginBottom: "16px" }}>
              You collected three coins in the game. Use them here to win your
              discount on our premium services.
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "20px",
                alignItems: "stretch",
                justifyContent: "space-between",
              }}
            >
              {/* Left: vending machine + small HUD */}
              <div
                style={{
                  flex: "1 1 260px",
                  minWidth: "260px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <img
                  src={vendingImg}
                  alt="Vending Machine"
                  style={{
                    width: "100%",
                    maxWidth: "280px",
                    height: "auto",
                    userSelect: "none",
                    pointerEvents: "none",
                    display: "block",
                  }}
                />

                <div
                  style={{
                    width: "100%",
                    borderRadius: "16px",
                    background: "rgba(10, 5, 25, 0.9)",
                    padding: "10px",
                    boxSizing: "border-box",
                  }}
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gap: "6px",
                    }}
                  >
                    {[0, 1, 2, 3, 4, 5].map((d) => (
                      <div
                        key={d}
                        style={{
                          borderRadius: "10px",
                          border: "1px solid rgba(255, 255, 255, 0.25)",
                          fontSize: "14px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          opacity:
                            d === 4 || d === 5
                              ? rareUsed[d]
                                ? 0.4
                                : 1
                              : 1,
                        }}
                      >
                        {d}%
                      </div>
                    ))}
                  </div>

                  {/* Coin + counter */}
                  <div
                    style={{
                      marginTop: "10px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <div
                      style={{
                        width: "56px",
                        height: "56px",
                        borderRadius: "50%",
                        border: "3px solid #ffd166",
                        background:
                          "radial-gradient(circle at 30% 30%, #ffe29f, #f9c74f)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 700,
                        color: "#5a3000",
                        boxShadow:
                          "0 0 12px rgba(255, 209, 102, 0.8), 0 8px 16px rgba(0, 0, 0, 0.5)",
                      }}
                    >
                      %
                    </div>
                    <div
                      style={{
                        fontSize: "14px",
                        opacity: 0.9,
                      }}
                    >
                      {coinsLeft >= 0 ? coinsLeft : 0} coins left
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: info and actions */}
              <div
                style={{
                  flex: "1 1 260px",
                  minWidth: "260px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                <div>
                  <div style={{ fontSize: "14px", opacity: 0.9 }}>
                    Your draws:
                  </div>
                  <div
                    style={{
                      marginTop: "6px",
                      minHeight: "32px",
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "8px",
                    }}
                  >
                    {discounts.length === 0 && (
                      <span style={{ opacity: 0.7 }}>No discounts yet.</span>
                    )}
                    {discounts.map((d, index) => (
                      <span
                        key={`${d}-${index}`}
                        style={{
                          padding: "4px 10px",
                          borderRadius: "999px",
                          background: "rgba(255, 255, 255, 0.08)",
                          border: "1px solid rgba(255, 255, 255, 0.3)",
                          fontSize: "13px",
                        }}
                      >
                        {d}%
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ marginTop: "4px" }}>
                  <div
                    style={{
                      fontSize: "14px",
                      opacity: 0.9,
                      marginBottom: "4px",
                    }}
                  >
                    Your total discount on our premium services:
                  </div>
                  <div
                    style={{
                      fontSize: "24px",
                      fontWeight: 700,
                    }}
                  >
                    {totalDiscount}%
                  </div>
                </div>

                {coinsLeft > 0 && (
                  <button
                    onClick={handleWinDiscount}
                    style={{
                      marginTop: "8px",
                      padding: "10px 16px",
                      borderRadius: "999px",
                      border: "none",
                      cursor: "pointer",
                      fontWeight: 600,
                      fontSize: "15px",
                      background:
                        "linear-gradient(135deg, #ffd166, #f8961e, #f9844a)",
                      color: "#1b1b1b",
                      boxShadow:
                        "0 8px 20px rgba(0,0,0,0.45), 0 0 10px rgba(248,150,30,0.8)",
                    }}
                  >
                    Win discount
                  </button>
                )}

                {coinsLeft === 0 && (
                  <button
                    onClick={handleOrderWithDiscount}
                    style={{
                      marginTop: "8px",
                      padding: "10px 16px",
                      borderRadius: "999px",
                      border: "none",
                      cursor: "pointer",
                      fontWeight: 600,
                      fontSize: "15px",
                      background:
                        "linear-gradient(135deg, #06d6a0, #1b9aaa, #118ab2)",
                      color: "#fefefe",
                      boxShadow:
                        "0 8px 20px rgba(0,0,0,0.45), 0 0 10px rgba(17,138,178,0.8)",
                    }}
                  >
                    Order our services and get {totalDiscount}% off
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Game;

