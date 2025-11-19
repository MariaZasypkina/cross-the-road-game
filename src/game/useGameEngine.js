// src/game/useGameEngine.js
import { useEffect, useRef, useState } from "react";
import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  TILE_WIDTH,
  TILE_HEIGHT,
  PLAYER_START_COL,
  PLAYER_START_ROW,
  LEVELS,
  MAX_LIVES,
} from "./constants.js";
import { sprites } from "./sprites.js";

// Helper functions for grid <-> pixel
function toPixelX(col) {
  return col * TILE_WIDTH;
}
function toPixelY(row) {
  // Small offset so characters stand nicely on tiles
  return row * TILE_HEIGHT - 20;
}

// Create initial enemies for a level
function createEnemiesForLevel(level) {
  const enemies = [];
  level.enemyRows.forEach((row) => {
    const [min, max] = level.enemySpeedRange;
    const speed = min + Math.random() * (max - min);
    enemies.push({
      x: -TILE_WIDTH * Math.random() * 3, // start off screen to the left
      y: row,
      speed,
    });
  });
  return enemies;
}

export function useGameEngine(canvasRef) {
  const [levelIndex, setLevelIndex] = useState(0);
  const [lives, setLives] = useState(MAX_LIVES);
  const [status, setStatus] = useState("playing"); // "playing" | "won" | "lost" | "finished"

  // Refs to store mutable game objects without re-renders
  const playerRef = useRef({ col: PLAYER_START_COL, row: PLAYER_START_ROW });
  const enemiesRef = useRef(createEnemiesForLevel(LEVELS[0]));
  const keyRef = useRef({
    col: LEVELS[0].keyCol,
    row: LEVELS[0].keyRow,
    collected: false,
  });

  const princessRef = useRef({ col: 2, row: 0 }); // final tile on top row

  const statusRef = useRef(status);
  useEffect(() => {
    statusRef.current = status;
  }, [status]);

  const levelRef = useRef(levelIndex);
  useEffect(() => {
    levelRef.current = levelIndex;
  }, [levelIndex]);

  // Restart game
  function restartGame() {
    setLevelIndex(0);
    setLives(MAX_LIVES);
    setStatus("playing");
    playerRef.current = { col: PLAYER_START_COL, row: PLAYER_START_ROW };
    enemiesRef.current = createEnemiesForLevel(LEVELS[0]);
    keyRef.current = {
      col: LEVELS[0].keyCol,
      row: LEVELS[0].keyRow,
      collected: false,
    };
  }

  // Move to next level
  function goToNextLevel() {
    const nextIndex = levelRef.current + 1;
    if (nextIndex >= LEVELS.length) {
      setStatus("finished");
      return;
    }
    setLevelIndex(nextIndex);
    setStatus("playing");
    const nextLevel = LEVELS[nextIndex];
    playerRef.current = { col: PLAYER_START_COL, row: PLAYER_START_ROW };
    enemiesRef.current = createEnemiesForLevel(nextLevel);
    keyRef.current = {
      col: nextLevel.keyCol,
      row: nextLevel.keyRow,
      collected: false,
    };
  }

  // Handle keyboard input (grid-based movement)
  useEffect(() => {
    function handleKeyDown(e) {
      if (statusRef.current !== "playing") return;
      const player = playerRef.current;

      if (e.key === "ArrowLeft") {
        if (player.col > 0) player.col -= 1;
      } else if (e.key === "ArrowRight") {
        if (player.col < 4) player.col += 1;
      } else if (e.key === "ArrowUp") {
        if (player.row > 0) player.row -= 1;
      } else if (e.key === "ArrowDown") {
        if (player.row < 5) player.row += 1;
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Main game loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let lastTime = performance.now();
    let frameId;

    function update(dt) {
      const player = playerRef.current;
      const enemies = enemiesRef.current;
      const key = keyRef.current;
      const level = LEVELS[levelRef.current];

      // Move enemies
      enemies.forEach((enemy) => {
        enemy.x += enemy.speed * dt;
        if (enemy.x > 5 * TILE_WIDTH) {
          enemy.x = -TILE_WIDTH;
          const [min, max] = level.enemySpeedRange;
          enemy.speed = min + Math.random() * (max - min);
        }
      });

      // Check collisions with enemies
      enemies.forEach((enemy) => {
        const enemyCol = Math.round(enemy.x / TILE_WIDTH);
        if (enemyCol === player.col && enemy.y === player.row) {
          // Hit
          setLives((prev) => {
            const next = prev - 1;
            if (next <= 0) {
              setStatus("lost");
            }
            return next;
          });
          // reset player position
          playerRef.current = {
            col: PLAYER_START_COL,
            row: PLAYER_START_ROW,
          };
        }
      });

      // Check key pickup
      if (!key.collected && player.col === key.col && player.row === key.row) {
        key.collected = true;
      }

      // Check reaching princess (top row, needs key)
      if (
        player.row === princessRef.current.row &&
        player.col === princessRef.current.col &&
        key.collected
      ) {
        // Level passed
        setStatus("won");
      }
    }

    function drawBackground() {
      // 0 row - grass, 1-3 stone, 4-5 grass
      for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 5; col++) {
          let sprite = sprites.grass;

          if (row > 0 && row < 5) sprite = sprites.stone;
          if (row === 0) sprite = sprites.grass;
          const x = toPixelX(col);
          const y = row * TILE_HEIGHT - 20;
          ctx.drawImage(sprite, x, y);
        }
      }
    }

    function drawEntities() {
      const princess = princessRef.current;
      const player = playerRef.current;
      const enemies = enemiesRef.current;

      const key = keyRef.current;

      // Draw enemies
      enemies.forEach((enemy) => {
        const x = enemy.x;
        const y = toPixelY(enemy.y) + 30;
        ctx.drawImage(sprites.enemy, x, y, TILE_WIDTH, TILE_HEIGHT + 30);
      });

      // Draw finish tile (princess)) at the top
      ctx.drawImage(
        sprites.princess,
        toPixelX(princess.col),
        toPixelY(princess.row) + 30,
        TILE_WIDTH,
        TILE_HEIGHT + 40
      );

      // Draw key if not collected
      if (!key.collected) {
        ctx.drawImage(
          sprites.key,
          toPixelX(key.col),
          toPixelY(key.row),
          TILE_WIDTH,
          TILE_HEIGHT
        );
      }
      // Draw player
      ctx.drawImage(
        sprites.player,
        toPixelX(player.col),
        toPixelY(player.row),
        TILE_WIDTH,
        TILE_HEIGHT + 70
      );
    }

    function drawHUD() {
      ctx.save();
      ctx.fillStyle = "rgba(0, 0, 0, 0)";
      ctx.fillRect(0, 0, CANVAS_WIDTH, 40);

      ctx.fillStyle = "#ffffff";
      ctx.font = "12px system-ui, sans-serif";
      ctx.textBaseline = "middle";
      ctx.fillText(`Level: ${LEVELS[levelRef.current].id}`, 10, 20);
      ctx.fillText(`Lives: ${lives}`, 120, 20);

      if (statusRef.current === "won") {
        ctx.fillText("You got the coin and reached the finish!", 282, 20);
      } else if (statusRef.current === "lost") {
        ctx.fillText("Game over. Press Restart.", 220, 20);
      } else if (statusRef.current === "finished") {
        ctx.fillText("All levels complete!", 220, 20);
      }
      ctx.restore();
    }

    function gameLoop(timestamp) {
      const dt = (timestamp - lastTime) / 1000; // delta time in seconds
      lastTime = timestamp;

      // Clear canvas
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // Draw background
      drawBackground();

      if (statusRef.current === "playing") {
        update(dt);
      }

      drawEntities();
      drawHUD();

      frameId = requestAnimationFrame(gameLoop);
    }

    frameId = requestAnimationFrame(gameLoop);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [canvasRef, lives]);

  return {
    level: LEVELS[levelIndex].id,
    lives,
    status,
    restartGame,
    goToNextLevel,
    maxLevel: LEVELS.length,
  };
}
